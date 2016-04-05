# jslDate


>JavasScript Library - Date: format date based on giving formation string, and turn string to date
>Author: Shawn Lin
>Company: SugarApple.ca
>Date: Apr 4, 2016
>Version: 0.0.1


##Properties:
        * As in Format string as well
            - yyyy   - 4 digit year
            - yy     - 2 digit year
            - MMM    - month full name
            - MM     - short month name
            - M      - first leter of month names
            - mm     - 2 digit month
            - m      - 1 or 2 digit month
            - dd     - 2 digit day
            - d      - 1 or 2 digit day
            - WWW    - weekday full name
            - WW     - short weekday name
            - W      - first letter of weekday name
            - ww     - 2 digit day of week
            - w      - 1 digit day of week
            - HH     - 2 digit 24 hour
            - H      - 1 or 2 digit 24 hour
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
    var jslD = new jslDate({year: 2016, month: 4, day: 4, hour: 8, minute: 57, second: 17, isUTCInput: true, locale: 'en'});
    var jslD = new jslDate("2016-4-4 0:0:0", true); // 2016-4-4 0:0:0 is UTC date
    var jslD = new jslDate("2016-4-4 0:0:0"); // 2016-4-4 0:0:0 is local date
