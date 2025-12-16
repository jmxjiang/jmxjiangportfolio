"""jaydenjmxjiang portfolio

This module runs an app that represents a portfolio, with an interface expressing the portfolio.
The script also fetches the portfolio messages to the user. To run the app, run this file and go to
http://127.0.0.1:5000 at the terminal to access the app. Press CTRL+C to stop the app.
"""
import json
import os
from typing import List

from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, Response, session, url_for

load_dotenv()
app: Flask = Flask(__name__)

if flask_key := os.getenv("FLASK_KEY"):
    app.secret_key = flask_key
else:
    raise RuntimeError("Could not find FLASK_KEY in .env")


def load_json(filename) -> dict:
    """Loads the JSON file and returns it as a dict."""
    with open(filename, encoding='utf-8') as f:
        return json.load(f)


def template_from_dialogue(name) -> str:
    """Return the HTML file corresponding with the dialogue name. Returns the 404-page if necessary."""
    dialogue: dict = load_json('dialogue.json')
    msg_id: int = request.args.get('msg', default=0, type=int)
    response: str = request.args.get('response', default='', type=str)

    if name in dialogue:
        text: list = dialogue[name]
    else:
        return render_template('error.html', images=range(20))

    last_idx: int = len(text) - 1
    responses: None | List = None

    if msg_id < 0 or msg_id > last_idx:
        return render_template('error.html', images=range(10))

    data: dict = text[msg_id]

    if 'responses' in data:
        responses = data['responses']

    if 'text' in data:
        display: str = data['text']
    else:
        display: str = data[response]

    return render_template(f'{name}.html', msg=display, id=msg_id, is_not_last=msg_id < last_idx, is_first=msg_id == 0,
                           responses=responses, response=response)


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
    return render_template('egg.html', play=request.args.get('play', default=False, type=bool),
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


@app.route('/quiz', methods=['GET', 'POST'])
def quiz() -> str | Response:
    """This is where users take a quiz about programming."""
    language: str = request.args.get('language', default='', type=str)
    if not language:
        return template_from_dialogue('quiz')

    if 'answered_quiz' in session:
        return redirect(url_for('angry'))

    msg_id: int = request.args.get('msg', default=0, type=int)
    question_list: list = load_json('quiz.json')[language]
    invalid: bool = 'score' not in session or 'answered_quiz' in session

    if msg_id >= len(question_list):
        if invalid:
            return redirect(url_for('angry'))

        session['answered_quiz'] = True
        session['final_score'] = session['score']
        del session['score']
        del session['answered']
        return redirect(url_for('result'))

    question: dict = question_list[msg_id]

    if msg_id == 0 and 'score' not in session:
        session['score'] = 0
        session['answered'] = []

    if request.method == 'POST':
        if invalid:
            return redirect(url_for('angry'))

        if msg_id not in session['answered']:
            session['answered'].append(msg_id)
            session.modified = True
            if request.form.get('ans') == question['answer']:
                session['score'] += 1
        else:
            session['tried'] = True

        return redirect(url_for('quiz', msg=msg_id + 1, language=language))

    return render_template('quiz.html', msg=question['question'], options=question['options'], language=language)


@app.route('/meeting')
def meeting() -> str:
    """This is a serious meeting between the computer and the egg."""
    return template_from_dialogue('meeting')


@app.route('/angry')
def angry() -> str:
    """The computer is very angry at this route."""
    return render_template('angry.html')


@app.route('/result')
def result() -> str | Response:
    """Results are here for the quiz."""
    if 'final_score' in session:
        return template_from_dialogue('result')
    else:
        return render_template('error.html', images=range(30))


@app.errorhandler(404)
def not_found(_) -> tuple[str, int]:
    """404 error page."""
    return render_template('error.html', images=range(20)), 404


if __name__ == '__main__':
    app.run(debug=True)
