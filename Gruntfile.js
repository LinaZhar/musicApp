'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        web: 'web/src',
        dist: 'web/dist',
        tmp: 'tmp'
    };

    // Grunt configuration
    grunt.initConfig({
        // Project settings
        musicApp: appConfig,
        // The grunt server settings
        strip: {
            "dist": {
                "src": "<%= musicApp.web %>/scripts/**/*.js",
                "options": {
                    "inline": true,
                    "nodes": [
                        "console.log",
                        "console.warn",
                        "debugger"
                    ]
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            template: {
                files: ['<%= musicApp.web %>/js/**/*.html'],
                tasks: ['ngtemplates'],
                options: {
                    nospawn: true
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= musicApp.dist %>/{,*/}*',
                        '!<%= musicApp.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= musicApp.web %>',
                        dest: '<%= musicApp.dist %>',
                        src: [
                            'vendor/**/*.*',
                            'scripts/**/*.js',
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'vendor/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= musicApp.dist %>'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= musicApp.web %>/css',
                dest: '.tmp/css/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= musicApp.dist %>/scripts/{,*/}*.js',
                    '<%= musicApp.dist %>/css/{,*/}*.css'
                ]
            }
        },
        ngtemplates: {
            build: {
                src: [
                    '<%= musicApp.web %>/**/*.html',
                ],
                dest: '<%= musicApp.dist %>/templates.js',
                options: {
                    url: function (url) {
                        return url.replace('web/src/', '');
                    },
                    module: "app",
                    htmlmin: {
                        collapseWhitespace: true,
                        conservativeCollapse: true,
                        collapseBooleanAttributes: true,
                        removeCommentsFromCDATA: true,
                        removeOptionalTags: true
                    }
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= musicApp.dist %>',
                    src: ['*.html', 'scripts/**/*.html'],
                    dest: '<%= musicApp.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: 'web/index.html',
            options: {
                dest: 'www'
            }
        },
        usemin: {
            html: ['www/index.html']
        },
        jshint: {
            sources: {
                files: {
                    src: 'web/**/*.js'
                },
                options: {
                    reporterOutput: '.tmp/jshint/jshint_sources_report.xml'
                }
            },
            dist: {
                files: {
                    src: 'www/**/*.js'
                },
                options: {
                    reporterOutput: '.tmp/jshint/jshint_dist_report.xml'
                }
            },
            options: {
                reporter: 'checkstyle',
                reporterOutput: '.tmp/jshint/jshint_report.xml',
                force: true,
                jshintrc: true
            }
        }
    });

    grunt.registerTask('wait', ['watch']);

    grunt.registerTask('build', [
        'ngtemplates:build',
        'useminPrepare',
        'copy:dist',
        'usemin',
        'htmlmin'
    ]);

};