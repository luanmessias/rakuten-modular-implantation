module.exports = function (grunt) {

    //Plugins utilizados no projeto [Não alterar]
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //Plugin responsável pelo deploy via ftp
    grunt.loadNpmTasks('grunt-ftp-deploy');

    grunt.initConfig({
        config: {
            projectFolder: 'Implantacao',
        },

        paths: {
            custom: 'R:/IKCLoja/Genesis/Repository/<%= config.projectFolder %>/locales/custom/'            
        },

        //TASK - SASS
        sass: {
            modules: {
                options: {
                    style: 'compressed',
                    sourcemap: 'auto'
                },
                files: exportModules()
            }
        },


        //TASK - COPY
        copy: {
            core: {
                files: moveCore()
            },
            banners: {
                files: moveBanners()
            },
            css_components: {
                files: copyComponents()
            },
            css_config: {
                expand: true,
                cwd: '../sass/4_production/config/',
                src: ['*.css'],
                dest: '<%=paths.custom%>css/config/'
            },
            fonts:{
                expand: true,
                cwd: '../sass/4_production/config/',
                src: ['**'],
                dest: '<%=paths.custom%>css/config/'
            },
            css_base: {
                expand: true,
                cwd: '../sass/4_production/',
                src: ['*.css'],
                dest: '<%=paths.custom%>css/'
            },
            js: {
                expand: true,
                cwd: '../js/',
                src: ['**.js'],
                dest: '<%=paths.custom%>js/'
            },
            img: {
                expand: true,
                cwd: '../img/',
                src: ['**'],
                dest: '<%=paths.custom%>img/'
            }
        },


        //TASK - WATCH
        watch: {
            config: {
                files: ['Gruntfile.js', '*.json'],
                tasks: ['w'],
                options: {
                    reload: true
                }
            },
            js: {
                files: ['../js/*.js'],
                tasks: ['copy:js']
            },
            img: {
                files: ['../img/*'],
                tasks: ['copy:img']
            },
            scss: {
                files: '../sass/**/*.scss',
                tasks: ['export']
            },
        },

        //TASK - DEPLOY FTP
        'ftp-deploy': {
            build: {
                auth: {
                    host: '200.229.205.140',
                    port: 21,
                    authKey: 'implantacao',
                    autPath: './.ftpconfig'
                },
                src: '<%=paths.custom%>css/',
                dest: '/Genesis/Repository/Implantacao/locales/custom/css/',
                exclusions: ['<%=paths.custom%>**/.DS_Store', '<%=paths.custom%>**/Thumbs.db']
            }
        }

    });

    grunt.registerTask('export', ['copy:core', 'sass:modules', 'copy:css_config', 'copy:css_base', 'copy:css_components', 'ftp-deploy' ])
    grunt.registerTask('w', ['copy:core', 'copy:banners', 'copy:css_config', 'copy:fonts', 'ftp-deploy', 'watch' ]);


    //Função responsavel por mover os cores para dentro do projeto
    function moveCore() {
        var json = require('./core.json');
        var cores = json.cores;
        var files = [];
        for (var core in cores) {
            files.push({
                expand: true,
                cwd: "../sass/0_core/" + cores[core].name + "/" + cores[core].coreVersion + "/",
                src: "*.scss",
                dest: "../sass/2_deploy/core/"
            });
            //grunt.log.write("../sass/0_core/" + cores[core].name + "/" + cores[core].coreVersion + "/\r\n");
        };
        grunt.log.write("Core importado com sucesso \r\n");
        return files;
    }

    //Função responsavel por mover os modelos de banner para dentro do projeto
    function moveBanners() {
        var json = require('./core.json');
        var banners = json.banners;
        var files = [];
        for (var banner in banners) {
            files.push({
                src: "../sass/0_core/banners/" + banners[banner].coreVersion + "/_core_banners.scss",
                dest: "../sass/2_deploy/core/" + banners[banner].name + "/_core_banners.scss" 
            });
        };
        grunt.log.write("Banners importados com sucesso \r\n");
        return files;
    }


    //Função responsavel por gerar o css de um ou mais modulos
    function exportModules() {
        var json = require('./deploy.json');
        var components = json.deploy;
        var files = [];
        for (var component in components) {
            files.push({
                expand: true,
                cwd: '../sass/3_declaration/',
                src: ["**/*_" + components[component].name + ".scss"],
                dest: '../sass/4_production/components/',
                ext: '.css'
            });
            grunt.log.write("Module exported: " + components[component].name + "\r\n");
        }
        return files;
    }

    //Função responsavel por mover um ou mais componentes
    function copyComponents() {
        var json = require('./deploy.json');
        var components = json.deploy;
        var files = [];
        for (var component in components) {
            if (components[component].name == "*") {
                files.push({
                    expand: true,
                    cwd: '../sass/4_production/components/',
                    src: ['**'],
                    dest: '<%=paths.custom%>css/components/'
                });
            } else {
                files.push({
                    expand: true,
                    cwd: '../sass/4_production/components/' + components[component].name + '/',
                    src: ['**'],
                    dest: '<%=paths.custom%>css/components/' + components[component].name + '/'
                });
            }

            grunt.log.write("Module trasnfered: " + components[component].name + "\r\n");
        }
        return files;
    }

};