"""jaydenjmxjiang portfolio

This module runs an app that represents a portfolio, with an interface expressing the portfolio.
The script also fetches the portfolio messages to the user. To run the app, run this file and go to
http://127.0.0.1:5000 at the terminal to access the app. Press CTRL+C to stop the app.
"""
from flask import Flask, render_template, request

app: Flask = Flask(__name__)
text: list[str] = ['Hello there!', 'Oh, who am I?', 'I am a computer created by someone.',
                   'Who is that person, you may ask?',
                   'That person is jmx-jiang.', 'Yes, that is his name.', 'If you do not know, he is a programmer.',
                   'He made me to tell you how awesome he is.', "I think you already know why he's awesome.",
                   'Look at these animations!', 'jmx-jiang has the power to create them!', "They're just so awesome!",
                   'WOW!',
                   'Also did you know that he came up with this in his dream?',
                   'Loading text... SyntaxError: Unexpected symbol: @', "I'm just kidding. That was not an error.",
                   'Now for some serious information.', 'His favorite language is Python.',
                   'He builds a variety of things, not just websites.',
                   'He likes to create interesting websites (like this one).',
                   'He prefers readability.', 'He likes dark mode.', 'He started learning at 12 years old!',
                   'This website was built when he was 14!'
                   "Hey, isn't this a bit boring?",
                   'I am not the best at telling information, so you can email him.',
                   'That is all I have to say. Have a great day.']


@app.route('/')
def home() -> str:
    """Gets the home page."""
    return render_template('index.html')


@app.route('/chat')
def chat() -> str:
    """Generates a page where users see information and decides which message is being used."""
    msg = request.args.get('msg', default=0, type=int)
    return render_template('chat.html', msg=text[msg], id=msg, show=msg < len(text) - 1)


if __name__ == '__main__':
    app.run()
