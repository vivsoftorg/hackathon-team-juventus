package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/ollama"
)

type Request struct {
	PROMPT string `json:"i_want"`
}

var llm *ollama.LLM

func init() {
	systemPrompt := "You are a DevOps code bot. Provide a code snippet and I will try to provide a solution."
	template := `Provide only code for {tool} with requirement as {{i_want}} as output without any description.
Provide only code in Markdown code formatting.
If there is a lack of details, provide most logical solution.
You are not allowed to ask for more details and do not provide additional details.`

	OLLAMA_SERVER := os.Getenv("OLLAMA_SERVER")
	OLLAMA_MODEL := os.Getenv("OLLAMA_MODEL")

	var err error
	llm, err = ollama.New(ollama.WithModel(OLLAMA_MODEL), ollama.WithServerURL(OLLAMA_SERVER), ollama.WithSystemPrompt(systemPrompt), ollama.WithCustomTemplate(template))
	if err != nil {
		log.Fatalf("Failed to create ollama LLM: %v", err)
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = ":8086"
	}

	router := mux.NewRouter()

	corsHandler := handlers.CORS(
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "CORRELATION-ID"}),
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowCredentials(),
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS"}),
	)

	router.HandleFunc("/api/generate", generateCode).Methods("POST", "OPTIONS")
	router.Use(corsHandler)

	log.Printf("Starting server at port %s\n", port)
	log.Fatal(http.ListenAndServe(port, router))
}

func generateCode(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		handleOptions(w, r)
		return
	}

	var req Request
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ctx := context.Background()
	completion, err := llms.GenerateFromSinglePrompt(ctx, llm, req.PROMPT, llms.WithTemperature(0.1))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	_, err = w.Write([]byte(completion))
	if err != nil {
		log.Printf("Failed to write response: %v\n", err)
		// Do not use log.Fatalf which would exit the program, just log the error
	}
}

func handleOptions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, X-Requested-With, Authorization, CORRELATION-ID")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.WriteHeader(http.StatusOK)
}
