// Cities array
let cities = [
    'الرياض',
    'مكة المكرمة',
    'المدينة المنورة',
    'القصيم',
    'الشرقية',
    'عسير',
    'تبوك',
    'حائل',
    'الحدود الشمالية',
    'جازان',
    'نجران',
    'الباحة',
    'الجوف'
];

// Populate cities dropdown
for (let city of cities) {
    const content = `<option>${city}</option>`;
    document.getElementById('cities-select').innerHTML += content;
}

// City change event listener
document.getElementById('cities-select').addEventListener('change', function () {
    document.getElementById('city-name').innerHTML = this.value;
    
    const cityName = getCityNameInEnglish(this.value);
    
    if (cityName) {
        getPrayerTimingsOfCity(cityName);
    }
});

// Function to convert Arabic city name to English API name
function getCityNameInEnglish(arabicName) {
    switch (arabicName) {
        case 'الرياض':
            return 'Ar Riyāḑ';
        case 'عسير':
            return 'Asīr';
        case 'الباحة':
            return 'Al Bāḩah';
        case 'الجوف':
            return 'Al Jawf';
        case 'المدينة المنورة':
            return 'Al Madīnah al Munawwarah';
        case 'القصيم':
            return 'Al Qaşīm';
        case 'الحدود الشمالية':
            return 'Al Ḩudūd ash Shamālīyah';
        case 'الشرقية':
            return 'Ash Sharqīyah';
        case 'جازان':
            return 'Jāzān';
        case 'مكة المكرمة':
            return 'Makkah al Mukarramah';
        case 'نجران':
            return 'Najrān';
        case 'تبوك':
            return 'Tabūk';
        case 'حائل':
            return 'Ḩā\'il';
        default:
            return null;
    }
}

// Function to fetch prayer timings from API
function getPrayerTimingsOfCity(cityName) {
    let params = {
        country: "SA",
        city: cityName
    };
    
    axios.get('https://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
    .then(function (response) {
        const timings = response.data.data.timings;
        
        // Fill prayer times
        fillTimeForPrayer('fajr-time', timings.Fajr);
        fillTimeForPrayer('sunrise-time', timings.Sunrise);
        fillTimeForPrayer('dhuhr-time', timings.Dhuhr);
        fillTimeForPrayer('asr-time', timings.Asr);
        fillTimeForPrayer('sunset-time', timings.Sunset);
        fillTimeForPrayer('isha-time', timings.Isha);

        // Display date
        const readableDate = response.data.data.date.gregorian.date;
        const weekDay = response.data.data.date.hijri.weekday.ar;
        const date = weekDay + " " + readableDate;
        document.getElementById('date').innerHTML = date;
    })
    .catch(function (error) {
        console.log(error);
    });
}

// Function to fill time for each prayer
function fillTimeForPrayer(id, time) {
    document.getElementById(id).innerHTML = time;
}

// Initialize with default city (Riyadh)
getPrayerTimingsOfCity('Ar Riyāḑ');