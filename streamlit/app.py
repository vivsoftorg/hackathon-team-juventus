import streamlit as st
from langchain.prompts import PromptTemplate
from langchain_community.llms import Ollama

## Function To get response from LLAma 2 model

def getLLamaresponse(input_text,tool):

    ### LLama2 model
    llm = Ollama(model="mistral:7b-instruct", base_url="http://127.0.0.1:11434")
    
    ## Prompt Template
    
    template="""Provide only code for {tool} with requirement as {input_text} as output without any description.
Provide only code in  Markdown code formatting.
Do not include symbols such as ``` or ```python.
If there is a lack of details, provide most logical solution.
You are not allowed to ask for more details and do not provide additional details.
"""
    
    prompt=PromptTemplate(input_variables=["code","tool","input_text"],
                          template=template)
    
    
    
    # response=llm.invoke("Tell me a joke")
    response=llm.invoke(prompt.format(tool=tool,input_text=input_text))

    print(response)
    return response






st.set_page_config(page_title="Generate Code",
                    page_icon='🤖',
                    layout='centered',
                    initial_sidebar_state='collapsed')

st.header("ENBUILD 🤖")

tool=st.selectbox('Write',
                        ('Terraform','python','Java','Go','Shell','Powershell','C#','C++','Ruby','NodeJS','Perl','PHP','HTML','CSS','Javascript','Typescript','SQL','NoSQL','Docker','Kubernetes'),index=0)
input_text=st.text_input("code for")


submit=st.button("Generate")

## Final response
if submit:
    st.write(getLLamaresponse(input_text,tool))
