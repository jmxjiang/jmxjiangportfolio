"""jaydenjmxjiang portfolio

This module runs an app that represents a portfolio, with an interface expressing the portfolio.
The script also fetches the portfolio messages to the user. To run the app, run this file and go to
http://127.0.0.1:5000 at the terminal to access the app. Press CTRL+C to stop the app.
"""
from datetime import date
import json
import os
from typing import List

from dotenv import load_dotenv
from flask import Flask, redirect, render_template, request, Response, session, url_for

load_dotenv()
app: Flask = Flask(__name__)
app.jinja_env.globals.update(zip=zip)

if flask_key := os.getenv("FLASK_KEY"):
    app.secret_key = flask_key
else:
    raise RuntimeError("Could not find FLASK_KEY in .env")


def load_json(filename) -> dict:
    """Loads the JSON file and returns it as a dict."""
    with open(filename, encoding='utf-8') as f:
        return json.load(f)


def template_from_dialogue(name) -> str | tuple[str, int]:
    """Return the HTML file corresponding with the dialogue name. Returns the 404-page if necessary."""
    dialogue: dict = load_json('static/dialogue.json')
    msg_id: int = request.args.get('msg', default=0, type=int)
    response: str = request.args.get('response', default='', type=str)

    if name in dialogue:
        text: list = dialogue[name]
    else:
        return render_template('error.html', images=range(20)), 404

    last_idx: int = len(text) - 1
    responses: None | List = None

    if msg_id < 0 or msg_id > last_idx:
        return render_template('error.html', images=range(10)), 404

    data: dict = text[msg_id]

    if 'responses' in data:
        responses = data['responses']

    if 'text' in data:
        display: str = data['text']
    elif response in data:
        display: str = data[response]
    else:
        return render_template('error.html', images=range(10)), 404

    return render_template(f'{name}.html', msg=display, id=msg_id, is_not_last=msg_id < last_idx, is_first=msg_id == 0,
                           responses=responses, response=response)


@app.route('/')
def home() -> str:
    """Gets the home page."""
    return render_template('index.html', yr=date.today().year)


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
    Er ist hier, um wieder mit Ihnen zu sprechen."""
    return template_from_dialogue('chat2')


@app.route('/quiz', methods=['GET', 'POST'])
def quiz() -> str | Response:
    """This is where users take a quiz about programming."""
    language: str = request.args.get('language', default='', type=str)
    if language:
        session['language'] = language
        return redirect(url_for('quiz'))

    if not language and 'language' not in session:
        return template_from_dialogue('quiz')

    if 'answered_quiz' in session:
        return redirect(url_for('angry'))

    msg_id: int = session.setdefault('msg_id', 0)
    language: str = session['language']
    question_list: list = load_json('static/quiz.json')[language]

    if msg_id >= len(question_list):
        session['answered_quiz'] = True
        session['final_score'] = session['score']
        del session['score']
        return redirect(url_for('result'))

    question: dict = question_list[msg_id]
    session.setdefault('score', 0)

    if request.method == 'POST':
        if request.form.get('ans') == question['answer']:
            session['score'] += 1

        session['msg_id'] += 1
        return redirect(url_for('quiz'))

    return render_template('quiz.html', msg=question['question'], options=question['options'])


@app.route('/meeting')
def meeting() -> str:
    """This is a serious meeting between the computer and the egg."""
    return template_from_dialogue('meeting')


@app.route('/angry')
def angry() -> str:
    """The computer is very angry at this route."""
    return render_template('angry.html')


@app.route('/result')
def result() -> str | tuple[str, int]:
    """Results are here for the quiz."""
    if 'final_score' in session:
        return template_from_dialogue('result')
    return render_template('error.html', images=range(30)), 404


@app.route('/trap')
def trap() -> str:
    """Someone gets trapped here."""
    return template_from_dialogue('trap')


@app.route('/minigame')
def minigame() -> str:
    """Have fun."""
    return render_template('minigame.html')


@app.route('/internship')
def internship() -> str:
    """It's time for an internship."""
    return template_from_dialogue('internship')


@app.errorhandler(404)
def not_found(_) -> tuple[str, int]:
    """404 error page."""
    return render_template('error.html', images=range(20)), 404


if __name__ == '__main__':
    app.run()
