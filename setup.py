import setuptools

setuptools.setup(
    name="zippy_tags",
    py_modules=["zippy_tags"],
    entry_points={"console_scripts": ["zippytags=zippy_tags.__main__:cli"]},
    long_description=open("README.md").read(),
    license=open("LICENSE.md").read(),
)
