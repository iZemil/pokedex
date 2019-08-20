const gulp = require('gulp');
const scanner = require('i18next-scanner');

const paths = ['src/**/*.{js,jsx}'];

gulp.task('i18next', () =>
    gulp
        .src(paths)
        .pipe(
            scanner({
                debug: false,
                sort: false,
                attr: {
                    list: ['data-i18n']
                },
                func: {
                    list: ['i18next.t', 'i18n.t', 'trans', 't', 'parseTrans'],
                    extensions: ['.js', '.jsx']
                },
                trans: {
                    component: 'Trans',
                    i18nKey: 'i18nKey',
                    extensions: ['.js', '.jsx'],
                    // @param {string} ns The namespace currently used.
                    // @param {key} key The translation key.
                    fallbackKey: (ns, key) => key
                },
                lngs: ['ru'],
                resource: {
                    loadPath: 'src/locale/{{lng}}.json',
                    savePath: 'locale/{{lng}}.json',
                    jsonIndent: 4,
                    lineEnding: '\n'
                },
                // @param {string} lng The language currently used.
                // @param {string} ns The namespace currently used.
                // @param {key} key The translation key.
                // @return {string} Returns a default value for the translation key.
                defaultValue: (lng, ns, key) => key,
                nsSeparator: false,
                keySeparator: false
            })
        )
        .pipe(gulp.dest('src/'))
);
