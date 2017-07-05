module.exports = function(category) {
    var log4js = require('log4js');

    /**
     * PatternLayout
     * Format for specifiers is %[padding].[truncation][field]{[format]}
     * e.g. %5.10p - left pad the log level by 5 characters, up to a max of 10
     * Fields can be any of:
     *  - %r time in toLocaleTimeString format
     *  - %p log level
     *  - %c log category
     *  - %h hostname
     *  - %m log data
     *  - %d date in various formats
     *  - %% %
     *  - %n newline
     *  - %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter
     * You can use %[ and %] to define a colored block.
     *
     * Tokens are specified as simple key:value objects. 
     * The key represents the token name whereas the value can be a string or function
     * which is called to extract the value to put in the log message. If token is not
     * found, it doesn't replace the field.
     *
     * A sample token would be: { "pid" : function() { return process.pid; } }
     *
     * Takes a pattern string, array of tokens and returns a layout function.
     * @param {String} Log format pattern String
     * @param {object} map object of different tokens
     * @return {Function}
     * @author Stephan Strittmatter
     * @author Jan Schmidle
     */

     log4js.configure({
         appenders : [{
             type : 'console',
             layout : {
                 type : 'pattern',
                 pattern : '%d %x{pid} %0.1p %c - %m',
                 tokens : {pid : function() {return process.pid}}
             }
         }, {
             type : 'file',
             filename : 'project.log',
             category : category
         }]
     });

     return log4js.getLogger(category);
}


