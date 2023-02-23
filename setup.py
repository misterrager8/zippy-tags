import setuptools

setuptools.setup(
    name="ZippyTags",
    version="1.0.0",
    entry_points={"console_scripts": ["zippy=zippy_tags.__main__:cli"]},
    long_description=open("README.md").read(),
    license=open("LICENSE.md").read(),
)
