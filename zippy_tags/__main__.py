import webbrowser

import click

from . import config, create_app


@click.group()
def cli():
    pass


@cli.command()
@click.option("-d", "--debug", is_flag=True, help="Run in development mode")
def run(debug):
    """Launch web interface."""
    app = create_app(config)
    if not debug:
        webbrowser.open(f"http://localhost:{config.PORT}")
    app.run(debug=debug, port=config.PORT)
