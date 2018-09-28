module.exports = function(grunt) {

    grunt.registerTask('test', 'Verify source code integrity.',

        function() {

            grunt.log.writeln('\n \u{1F50D}\u{0020} Linting... ');
            grunt.task.run(['eslint']);

        }

    );

};
