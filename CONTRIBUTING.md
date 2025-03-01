# Contributing

Thank you for contributing to this portfolio. Please read below to provide an effective contribution.

## How to Contribute

Fork the repository (go to "Code" and press fork in the top right corner).

Clone the repository and navigate to it:

```bash
git clone https://github.com/jmxjiang/jmxjiangportfolio.git
cd jmxjiangportfolio
```

Create a branch to work on (the branch name should be meaningful, like fix-overlapping):

`git checkout -b <branch-name>`

Make your changes, add, and commit them:

```bash
git add .
git commit -m "Commit message"
```

Push changes

`git push origin <branch-name>`

Go back to the repository, then click on "Pull Requests" to create a pull request. When making a pull request, describe
the changes made and refer to relevant issues.

## Style Guidelines

### Python

- Follow [PEP8](https://peps.python.org/pep-0008/) unless there are exceptions stated below.

- Lines should be no more than 120 characters long.

- Use single quotes (unless that quote represents a docstring or contains single quotes).

- Use [Google style](https://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html) docstrings.

- Type hinting should be used.

- Comments should only be used to tell information that the code does not give. If the code needs comments for clarity,
  that code should be refactored.

```python
"""Example of what a file should look like.

This docstring should follow Google style.

...
"""

module_variable = 'example'


def function(arg1: int, arg2: str) -> None:
    """Function docstring."""
    return None


# TODO: Something important here.

```

### HTML & CSS

All HTML code should look like this (spacing, indentation, etc. should be like this):

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{{ url_for('static', filename='/css/style.css') }}" />
    <link rel="icon" href="{{ url_for('static', filename='/favicon/logo.png') }}" />
  </head>
  <body>
    <!-- Everything else here -->
  </body>
</html>

```

For more specific guidelines:

- JetBrains Mono font should be used (unless you suggest a new font or it is deprecated).
  - If the font is deprecated, please open an issue to discuss replacements (or keep the fallback fonts).
- The max line length should be 120.
- If the line needs to be broken down, the starting tag and the ending tag should be at the same column (unless for
  self-closing tags).
- If a line is broken down, attributes should be on each line.
- Indent with two spaces (not tabs).
- Use meaningful names when possible (e.g. `class="eye"` instead of `class="e"`)
- Do not introduce typos.
- Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Title</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="{{ url_for('static', filename='/css/style.css') }}" />
    <link rel="icon" href="{{ url_for('static', filename='/favicon/logo.png') }}" />
  </head>
  <body>
    <p
      class="a lot of classes are being applied here and this is just a demonstration"
      data-info="notice how the lines are broken down">
      Notice the indentation.
    </p>

    <img src="file path" alt="notice how the lines are broken down" />
  </body>
</html>

```

For CSS, code should be written like this (guidelines above also apply when applicable):

```css
body {
  property: value;
  property: "value";
  /* 2 space indentation (not tabs) and double quotes are used. */
}

p {
  property: value value value;
  /* Notice the use of semicolons. */
}

/* Example animation */
keyframes question {
  0% {
    transform: translateY(-100px);
  }
  50% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100px);
  }
}
```

**It is important for factual information to be verified. Feel free to change the website's UI, refactor code, etc. but
do not include factual information that is not verified by the owner.**

## Committing

When creating commit messages, this is the most basic format that should be used:

`<type>: <description>`

Where _type_ corresponds to the type of change made (including feat, docs, fix, etc.) and _description_ corresponds to
the change made. The description should be clear and concise.

**Commit messages should convey what changed, not what you did. Because of this, present tense must be used and the word
"I" should not be used.**

Examples:

```bash
# Bad -- present tense and subject pronoun
docs: I fixed a typo in README.md
```

```bash
# Good
docs: Fix typo in README.md
```

```bash
# Bad -- not specific
docs: Update
```

```bash
# Good -- clear what changed
docs: Add more clear instructions for installing portfolio
```

Please visit [here](https://www.conventionalcommits.org/en/v1.0.0/) for more information.

## Code of Conduct

**Discrimination, hate speech, generating stereotypes, aggressive behavior, harmful sarcasm, malicious links, false or
misleading information, spamming, or any form of impolite language shall not be present within this repository. Privacy,
empathy and constructive feedback are strongly encouraged where applicable.**

Thank you for reading and contributing.
