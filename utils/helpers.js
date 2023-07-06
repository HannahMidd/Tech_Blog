// Using dayJS to grab the date and timestamp

module.exports = {
    format_date: (date) => {
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    },
};
