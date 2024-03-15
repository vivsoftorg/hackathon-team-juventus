package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"strings"
	"bufio"

	"github.com/tmc/langchaingo/llms"
	"github.com/tmc/langchaingo/llms/ollama"
)

func main() {
	system_prompt := "You are a DevOps code bot. Provide a code snippet and I will try to provide a solution."
	template := `Provide only code for {tool} with requirement as {input_text} as output without any description.
	Provide only code in  Markdown code formatting.
	If there is a lack of details, provide most logical solution.
	You are not allowed to ask for more details and do not provide additional details.
	`
	OLLAMA_SERVER := os.Getenv("OLLAMA_SERVER")
	OLLAMA_MODEL := os.Getenv("OLLAMA_MODEL")

	flag.Parse()
	args := flag.Args()

	var query string
	var err error

	// If there are command-line arguments, concatenate them
	if len(args) > 0 {
		query = joinArgs(args)
	} else {
		query = readFromStdin()
	}


	llm, err := ollama.New(ollama.WithModel(OLLAMA_MODEL), ollama.WithServerURL(OLLAMA_SERVER), ollama.WithSystemPrompt(system_prompt), ollama.WithCustomTemplate(template))
	if err != nil {
		log.Fatal(err)
	}

	ctx := context.Background()
	completion, err := llms.GenerateFromSinglePrompt(
		ctx,
		llm,
		query,
		llms.WithTemperature(0.1),
		llms.WithStreamingFunc(func(ctx context.Context, chunk []byte) error {
			fmt.Print(string(chunk))
			return nil
		}),
	)
	if err != nil {
		log.Fatal(err)
	}

	_ = completion
}

// joinArgs concatenates command-line arguments with a space separator
func joinArgs(args []string) string {
    return strings.Join(args, " ")
}

// readFromStdin reads content from standard input
func readFromStdin() string {
    var contentBuilder strings.Builder
    scanner := bufio.NewScanner(os.Stdin)
    for scanner.Scan() {
        contentBuilder.WriteString(scanner.Text())
    }
    if err := scanner.Err(); err != nil {
        fmt.Printf("Error reading standard input: %v\n", err)
        os.Exit(1)
    }
    return contentBuilder.String()
}
