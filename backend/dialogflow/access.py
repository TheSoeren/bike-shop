import os
from google.cloud import dialogflow

# path to the key-file
current_dir = os.path.dirname(__file__)
certificate = "blockbuster-revival-clet-7449d8972a01.json"
full_path = os.path.join(current_dir, certificate)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = full_path
project_name = 'blockbuster-revival-clet'


# example from  https://cloud.google.com/dialogflow/es/docs/quick/api#detect-intent-text-python
def send_intent(session_id, text, language_code):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path(project_name, session_id)

    text_input = dialogflow.TextInput(text=text, language_code=language_code)
    query_input = dialogflow.QueryInput(text=text_input)

    response = session_client.detect_intent(
        request={"session": session, "query_input": query_input}
    )
    return response.query_result.fulfillment_text
