"""jaydenjmxjiang portfolio

This module runs an app that represents a portfolio, with an interface expressing the portfolio.
The script also fetches the portfolio messages to the user. To run the app, run this file and go to
http://127.0.0.1:5000 at the terminal to access the app. Press CTRL+C to stop the app.
"""
from flask import Flask, render_template, request
import json

app: Flask = Flask(__name__)


def template_from_dialogue(name) -> str:
    """Return the HTML file corresponding with the dialogue name. Returns the 404-page if necessary."""
    with open('dialogue.json') as f:
        dialogue: dict = json.load(f)

    msg_id: int = request.args.get('msg', default=0, type=int)
    response: str = request.args.get('response', default='', type=str)
    text: list = dialogue[name]
    last_idx: int = len(text) - 1
    data = text[msg_id]
    responses = None

    if msg_id < 0 or msg_id > last_idx:
        return render_template('error.html', images=range(20))

    if 'responses' in data:
        responses = data['responses']

    if 'text' in data:
        display = data['text']
    else:
        display = data[response]

    return render_template(
        f'{name}.html',
        msg=display,
        id=msg_id,
        is_not_last=msg_id < last_idx,
        is_first=msg_id == 0,
        responses=responses,
        response=response
    )


@app.route('/')
def home() -> str:
    """Gets the home page."""
    return render_template('index.html')


@app.route('/chat')
def chat() -> str:
    """Generates a page where users see information and decides which message is being used."""
    return template_from_dialogue('chat')


@app.route('/egg')
def egg() -> str:
    """Generates the page accessed by clicking the egg. This exists for some reason and don't ask me."""
    return render_template('egg.html',
                           play=request.args.get('play', default=False, type=bool),
                           clicked=request.args.get('clicked', default=False, type=bool))


@app.route('/rampage')
def rampage() -> str:
    """Generates the conversation between the computer and the egg. No questions asked."""
    return template_from_dialogue('rampage')


@app.route('/chat2')
def chat2() -> str:
    """Another typical chat with the computer.
    Er ist hier, um wieder mit Ihnen zu sprechen.
    Wait, why was I speaking German?
    Why am I typing this?
    I don't know what I'm doing.
    What is the computer of the cortex?
    Is it very supercalifragilisticexpialidocious?"""
    return template_from_dialogue('chat2')


@app.route('/quiz')
def quiz() -> str:
    """This is where users take a quiz about programming."""
    return render_template('quiz.html')


@app.route('/meeting')
def meeting() -> str:
    """This is a serious meeting between the computer and the egg."""
    return template_from_dialogue('meeting')


@app.errorhandler(404)
def not_found(_):
    """404 error page."""
    return render_template('error.html', images=range(20)), 404


if __name__ == '__main__':
    app.run(debug=True)
