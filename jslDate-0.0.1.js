/*
JavasScript Library: format date based on giving formation string
Author: Shawn Lin
Company: SugarApple.ca
Date: Apr 4, 2016
Version: 0.0.1
Properties:
        As in Format string as well
            yyyy   - 4 digit year
            yy     - 2 digit year
            MMM    - month full name
            MM     - short month name
            M      - first leter of month names
            mm     - 2 digit month
            m      - 1 or 2 digit month
            dd     - 2 digit day
            d      - 1 or 2 digit day
            WWW    - weekday full name
            WW     - short weekday name
            W      - first letter of weekday name
            ww     - 2 digit day of week
            w      - 1 digit day of week
            HH     - 2 digit 24 hour
            H      - 1 or 2 digit 24 hour
            hh     - 2 digits hour
            h      - 1 digit hour
            mi     - 2 digits minute
            i      - 1 or 2 digits minute
            ss     - 2 digits second
            s      - 1 or 2 digits second
            MS     - 3 digits millisecond
            ms     - 1, 2 or 3 digits millisecond
            t      - AM or PM
            TZS    - sign of time zone (none, + or - )
            TZH    - 2 digits hour offset
            TZM    - 2 digits minute offset
            TZD    - time zone designator (Z or +hhmm or -hhmm)
            TZ     - time zone full name (if browser supported)
            TS     - time zone abbreviation (if browser supported)
	
        settings: available settings
            year:
            month:
            day:
            hour:
            minute:
            second:
            millisecond:
            dateString:
            milliseconds:
            isUTCInput: false                      //above settings is for input date, please see example
            useSystemNames: false                  //this will use system names if browser supported, and will depend on locale
            utc: false                             //return utc date in the format
            locale: 'en'
            format: 'yyyy-mm-dd hh:mi:ss'
            monthNames : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
            weekdayNames : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]
            timePeriod :["AM","PM"]
        
Methods:
        Date updateSettings(settings)
            settings        - a setting object
            
        Date refreshData(utc, locale)
            utc             - true/false: whether return utc date
            locale          - if set, useSystemNames = true, browser support, and not utc, return the name based on the informations
        String toFormatDateString
            format          - the format that date to format to
            utc             - true/false: whether return utc date
            locale          - if set, useSystemNames = true, browser support, and not utc, return the name based on the informations

Example:
    JS:
	var jslD = new jslDate({format:"WWW, MMM dd, yyyy HH:mi:ss", locale:"en-CA"});
	var jslD = new jslDate("2016-4-4");
	jslD.toFormatDateString();
	jslD.updateSettings({format:"yyyymmdd\\THHmiss\\Z", useSystemNames: true}).toFormatDateString();
	jslD.updateSettings({format:"yyyymmdd", useSystemNames: true, locale:"zh-TW-u-ca-chinese"}).toFormatDateString();       //return lunar calendar
        jslD.updateSettings({timePeriod :["Morning","Afternoon"], useSystemNames: false}).refreshData().t;
        jslD.updateSettings({locale:"en", useSystemNames: true}).refreshData().MMM;
        var jslD = new jslDate({year: 2016, month: 4, day: 4, hour: 8, minute: 57, second: 17, isUTCInput: true, locale: 'en'})
        var jslD = new jslDate("2016-4-4 0:0:0", true); // 2016-4-4 0:0:0 is UTC date
        var jslD = new jslDate("2016-4-4 0:0:0"); // 2016-4-4 0:0:0 is local date
*/
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module
        define([], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but only CommonJS-like environments that support module.exports,
        // like Node
        module.exports = factory(require());
    } else {
        // browser globals (root is window)
        root.jslDate = factory(root);
    }
}(this, function() {
    var jslDate = function(year, month, day, hour, minute, second, millisecond, utc){
        var defaultSetting = {
            isUTCInput: false,
            useSystemNames: false,
            utc: false,
            locale: 'en',
            format: 'yyyy-mm-dd hh:mi:ss',
            monthNames : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            weekdayNames : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
            timePeriod :["AM","PM"]
        };
        var newUTCFromString = function(dateTime, utc, date_separator, time_separator, datetime_separator){
            if (typeof date_separator == "undefined")
                date_separator = "-";
            if (typeof time_separator == "undefined")
                time_separator = ":";
            if (typeof datetime_separator == "undefined")
                datetime_separator = " ";
                
            var dtArray = dateTime.split(datetime_separator);
            var date = dtArray[0];
            var time;
            if (dtArray.length > 1)
                time = dateTime.split(datetime_separator)[1];
            else
                time = "00:00:00";
            if (utc)
                return new Date(Date.UTC(date.split(date_separator)[0],date.split(date_separator)[1] - 1,date.split(date_separator)[2]
                    , time.split(time_separator)[0], time.split(time_separator)[1], time.split(time_separator)[2]));
            else
                return new Date(date.split(date_separator)[0],date.split(date_separator)[1] - 1,date.split(date_separator)[2]
                    , time.split(time_separator)[0], time.split(time_separator)[1], time.split(time_separator)[2]);
        };
        var parameterChecking = function(year, month, day, hour, minute, second, millisecond, utc){
            var date = new Date();
            if (typeof year == "string" && typeof month == "boolean" && typeof day == "string" && typeof hour == "string" && typeof minute == "string"){
                date = newUTCFromString(year, month, day, hour, minute);
            } else if ((typeof year == "string" || typeof year == "number") && typeof month == "boolean"){
                if (month){
                    d = new Date(year);
                    date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
                } else {
                    date = new Date(year);
                }
            } else if ((typeof year == "string" || typeof year == "number") && typeof month == "undefined"){
                date = new Date(year);
            } else if (typeof year != "undefined" && typeof month != "undefined" && typeof day != "undefined" && typeof hour != "undefined" && typeof minute != "undefined" && typeof second != "undefined" && typeof millisecond != "undefined" && typeof utc == "boolean"){
                if (utc){
                    date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
                } else {
                    date = new Date(year, month, day, hour, minute, second, millisecond);
                }
            } else if (typeof year != "undefined" && typeof month != "undefined" && typeof day != "undefined" && typeof hour != "undefined" && typeof minute != "undefined" && typeof second != "undefined" && typeof millisecond == "boolean"){
                if (millisecond){
                    date = new Date(Date.UTC(year, month, day, hour, minute, second));
                } else {
                    date = new Date(year, month, day, hour, minute, second);
                }
            } else if (typeof year != "undefined" && typeof month != "undefined" && typeof day != "undefined" && typeof hour != "undefined" && typeof minute != "undefined" && typeof second == "boolean"){
                if (second){
                    date = new Date(Date.UTC(year, month, day, hour, minute));
                } else {
                    date = new Date(year, month, day, hour, minute);
                }
            } else if (typeof year != "undefined" && typeof month != "undefined" && typeof day != "undefined" && typeof hour != "undefined" && typeof minute == "boolean"){
                if (minute) {
                    date = new Date(Date.UTC(year, month, day, hour));
                } else {
                    date = new Date(year, month, day, hour);
                }
            } else if (typeof year != "undefined" && typeof month != "undefined" && typeof day != "undefined" && typeof hour == "boolean"){
                if (hour) {
                    date = new Date(Date.UTC(year, month, day));
                } else {
                    date = new Date(year, month, day);
                }
            } else if (typeof year != "undefined" && typeof month != "undefined" && typeof day == "boolean"){
                if (day) {
                    date = new Date(Date.UTC(year, month ));
                } else {
                    date = new Date(year, month);
                }
            } else if (typeof year != "undefined" && typeof month != "undefined"){
                date = new Date(year, month)
            }
            return date;
        };
        var date = new Date();
        var settings = {};
        if (typeof year == "object" && typeof year.getDate == "function"){
            if (typeof month == "boolean" && month)
                date = new Date(Date.UTC(year.getFullYear(), year.getMonth(), year.getDate(), year.getHours(), year.getMinutes(), year.getSeconds(), year.getMilliseconds()))
            else
                date = year;
        }
        else if (typeof year == "object"){
            if (year.dateString){
                date = parameterChecking(year.dateString, year.isUTCInput);
            }
            else if (year.milliseconds){
                date = parameterChecking(year.milliseconds, year.isUTCInput);
            }
            else if (year.year &&  year.month || year.day || year.hour || year.minute || year.second || year.millisecond){
                if (typeof year.day == "undefined"){
                    date = parameterChecking(year.year, year.month, year.isUTCInput);
                } else if (typeof year.hour == "undefined"){
                    date = parameterChecking(year.year, year.month, year.day, year.isUTCInput);
                } else if (typeof year.minute == "undefined"){
                    date = parameterChecking(year.year, year.month, year.day, year.hour, year.isUTCInput);
                } else if (typeof year.second == "undefined"){
                    date = parameterChecking(year.year, year.month, year.day, year.hour, year.minute, year.isUTCInput);
                } else if (typeof year.millisecond == "undefined"){
                    date = parameterChecking(year.year, year.month, year.day, year.hour, year.minute, year.second, year.isUTCInput);
                } else {
                    date = parameterChecking(year.year, year.month, year.day, year.hour, year.minute, year.second, year.millisecond, year.isUTCInput);
                }
            }
            settings = year;
        }
        else
            date = parameterChecking(year, month, day, hour, minute, second, millisecond, utc);
        $.extend(true, date, defaultSetting);
        
        date.updateSettings = function(settings){
            $.extend(true, date, settings);
            return this;
        }
        date.refreshData = function(utc, locale){
            var self = this;
            if (typeof utc == "undefined")
                utc = this.utc;
            else if (typeof utc == "string" && (typeof locale == "boolean" || typeof locale == "undefined")){
                var newUtc =  (typeof locale == "boolean")? locale: this.utc;
                locale = utc;
                utc = newUtc;
            }
            if (typeof locale == "undefined"){
                locale = this.locale;
            }
    
            this.yyyy = utc ? this.getUTCFullYear().toString() : this.getFullYear().toString();
            this.yy = date.yyyy.substr(2,2);
            this.m = utc ? (this.getUTCMonth()+1).toString() : (this.getMonth()+1).toString(); // getMonth() is zero-based
            this.mm = this.m[1]?this.m:"0"+this.m;
            this.d  = utc ? this.getUTCDate().toString() : this.getDate().toString();
            this.dd = this.d[1]?this.d:"0"+this.d;
            this.w = this.getDay();
            this.ww = this.w[1]?this.w:"0"+this.w;
            this.H = utc ? this.getUTCHours().toString() : this.getHours().toString();
            this.HH = this.H[1]?this.H:"0"+this.H;
            var hour12 = this.H % 12;
            this.h = (hour12 ? hour12 : 12).toString();
            this.hh = this.h[1]?this.h:"0"+this.h;
            this.i  = utc ? this.getUTCMinutes().toString() : this.getMinutes().toString();
            this.mi = this.i[1]?this.i:"0"+this.i;
            this.s = utc ? this.getUTCSeconds().toString() : this.getSeconds().toString();
            this.ss = this.s[1]?this.s:"0"+this.s;
            this.ms = utc ? this.getUTCMilliseconds().toString() : this.getMilliseconds().toString();
            this.MS = this.ms[2]?this.ms:(this.ms[1]?"0"+this.ms:"00"+this.ms);
            this.t = (this.hh < 12 ? this.timePeriod[0]:this.timePeriod[1]);
            var timezonehour = (Math.floor(this.getTimezoneOffset() / 60)).toString();
            this.TZS = timezonehour? (timezonehour[0] == '-'? '+':'-'):"";
            timezonehour = timezonehour[0] == '-'? timezonehour[0].substr(1,timezonehour[0].length -1) : timezonehour[0];
            this.TZH = timezonehour[1]?timezonehour:"0" + timezonehour;
            this.TZM = (this.getTimezoneOffset() % 60).toString();
            this.TZM = this.TZM[1]?this.TZM:"0"+this.TZM;
            this.TZD = (utc || this.TZS == ""?"Z": (this.TZS + this.TZH + this.TZM));
            if (this.useSystemNames && this.toLocaleString(locale, {month: "narrow"}).length == 1){
                if (!utc){
                    this.yyyy = this.toLocaleString(locale, {year: "numeric"});
                    this.yy = this.toLocaleString(locale, {year: "2-digit"});
                    this.mm = this.toLocaleString(locale, {month: "2-digit"});
                    this.m = this.toLocaleString(locale, {month: "numeric"});
                    this.dd = this.toLocaleString(locale, {day: "2-digit"});
                    this.d = this.toLocaleString(locale, {day: "numeric"});
                    var hourpart = this.toLocaleString(locale, {hour:"numeric", hour12: true}).split(' ');
                    if (hourpart.length == 2){
                        this.t = isNaN(parseInt(hourpart[0]))? hourpart[0]: hourpart[1];
                    } else {
                        this.t = this.toLocaleString(locale, {hour:"numeric", hour12: true}).split(/\d/)[0];
                    }
                    isNaN(parseInt(hourpart[1]))
                }
                this.M = this.toLocaleString(locale, {month: "narrow"}); 
                this.MM = this.toLocaleString(locale, {month: "short"}); 
                this.MMM = this.toLocaleString(locale, {month: "long"}); 
                this.W = this.toLocaleString(locale, {weekday: "narrow"}); 
                this.WW = this.toLocaleString(locale, {weekday: "short"}); 
                this.WWW = this.toLocaleString(locale, {weekday: "long"}); 
                this.TZ = this.toLocaleString(locale,{timeZoneName:"long", day: "2-digit"}).split(' ')
                this.TZ.shift();
                this.TZ = this.TZ.join(' ');
                this.TS = this.toLocaleString(locale,{timeZoneName:"short", day: "2-digit"}).split(' ')[1];
            } else {
                this.M = this.monthNames[this.m -1].substr(0,1);
                this.MM = this.monthNames[this.m -1].substr(0,3);
                this.MMM = this.monthNames[this.m -1];
                this.W = this.weekdayNames[this.getDay()].substr(0,1);
                this.WW = this.weekdayNames[this.getDay()].substr(0,3);
                this.WWW = this.weekdayNames[this.getDay()];
                this.TZ = this.toString().match(/\((.*)\)/)[1];
                this.TS = this.toString().match(/\((.*)\)/)[1];
            }
            return this;
        }
        date.toFormatDateString = function(format, utc, locale) {
            var self = this;
            var doRefresh = false;
            if (typeof utc != "undefined" || typeof locale != "undefined")
                doRefresh = true;
            if (typeof format == "undefined")
                format = this.format;
            if (typeof utc == "undefined")
                utc = this.utc;
            else if (typeof utc == "string" && (typeof locale == "boolean" || typeof locale == "undefined")){
                var newUtc =  (typeof locale == "boolean")? locale: this.utc;
                locale = utc;
                utc = newUtc;
            }
            if (typeof locale == "undefined"){
                locale = this.locale;
            }
            if (doRefresh)
                this.refreshData(utc, locale);
            return format.replace(/(yyyy|MMM|WWW|TZS|TZH|TZM|TZD|MM|WW|HH|MS|TZ|TS|yy|mm|dd|ww|hh|mi|ss|ms|\\\\|\\M|\\W|\\H|\\Z|\\S|\\T|\\y|\\m|\\d|\\w|\\h|\\i|\\s|\\t|M|W|H|m|d|w|h|i|s|t)/g, function(t) {return self[t] || t.replace('\\', '');});
        };
        return date.updateSettings(settings).refreshData();
    }
    return jslDate;
}));
