
// Given a `const` variable `TEMPLATE_DIR` which points to "<semantic-release-gitmoji>/lib/assets/templates"

// the *.hbs template and partials should be passed as strings of contents
// const template = readFileAsync(path.join(TEMPLATE_DIR, 'default-template.hbs'))
// const commitTemplate = readFileAsync(path.join(TEMPLATE_DIR, 'commit-template.hbs'))

module.exports = {
    plugins: [
        [
            "@semantic-release/commit-analyzer",//此处只导入解析规则 parserOpts
            {
                "config": "conventional-changelog-cmyr-config"
            }
        ],
        ["@semantic-release/release-notes-generator",//此处导入解析和生成规则 parserOpts, writerOpts
            {
                config: "conventional-changelog-cmyr-config"
            }],
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "CHANGELOG.md",
                "changelogTitle": "# my-changelog-test"
            }
        ],
        '@semantic-release/npm',
        ['@semantic-release/github',
            {
                assets: [
                    {
                        path: 'dist.zip',
                        label: 'dist.zip (${nextRelease.gitTag})'
                    }
                ],
            }],
        [
            "@semantic-release/git",
            {
                "assets": [
                    "src",
                    "dist",
                    "CHANGELOG.md",
                    "package.json",
                    "yarn.lock"
                ]
            }
        ]
    ]
}