class Utils {

    static addDays(days) {
        let date = new Date()
        date.setDate(date.getDate() + days);
        return date
    }

    static convertToDisplayFormat(value, noDataText = "n/a") {
        if (isNaN(value))
            return noDataText
        return value.toLocaleString()
    }

    static convertToDisplay(value, noDataText = "n/a") {
        if (value != null) {
            // * coerce to Number and add commas...
            return Utils.convertToDisplayFormat(Number(value))
        }
        else
            return noDataText
    }

    static toDisplayDate(dateStr){
        let retVal = dateStr
        try {
            if (dateStr) {
                let fields = dateStr.split("-")
                retVal = `${fields[1]}/${fields[2]}/${fields[0]}`
            }
        }
        catch (err) {
            console.log(err)
            retVal = err.message
        }
        return retVal
    }

    static parseDate(dateStr) {
        let fields = dateStr.split("-")
        let retVal = Utils.formatDate(new Date(Number(fields[0]), Number(fields[1]) - 1, Number(fields[2])))
        return retVal
    }

    // formats date as YYYY-MM-DD
    static formatDate(date) {
        return date.toISOString().split('T')[0]
    }

    static formatTime(date, use24HourClock = true) {
        if (use24HourClock)
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
        else
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }

    static formatTemperature(weatherData, weatherUnits) {
        let unitLabel = (weatherUnits === 0) ? "F" : "C"
        return `${Math.round(weatherData.main.temp)}°${unitLabel}`
    }

}

export default Utils