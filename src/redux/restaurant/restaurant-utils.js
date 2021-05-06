export const filterRestaurants = (keyword, allRestaurants) => {
    let priceKey = 'unknown';

    const filteredRestaurants = allRestaurants.filter(restaurant => {
        if (Math.round(restaurant.price_range) === 1) {
            priceKey = 'cheap eats';
        } else if (Math.round(restaurant.price_range) === 2) {
            priceKey = 'mid-range';
        } else if (Math.round(restaurant.price_range) === 3) {
            priceKey = 'fine dining';
        } else {
            priceKey = 'unknown';
        };
        return restaurant.restaurant_name.toLowerCase().includes(keyword.toLowerCase()) || 
        restaurant.type.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(keyword.toLowerCase()) || 
        priceKey.toLowerCase().includes(keyword.toLowerCase()) || 
        restaurant.city.toLowerCase().includes(keyword.toLowerCase()) || 
        restaurant.region.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.country.toLowerCase().includes(keyword.toLowerCase())
    });

    if (filteredRestaurants.length !== 0) {
        return filteredRestaurants;
    } else {
        return 'no matches found';
    }
};

export const filterRestaurantsByFeature = (keyword, keywordLocation, allRestaurants, filteredRestaurants) => {
    let selectedRestaurants = [];
    let priceKey = 'unknown';

    if (filteredRestaurants.length && typeof filteredRestaurants !== 'string' && keyword.length) {
        selectedRestaurants = filteredRestaurants.filter(restaurant => {
            if (Math.round(restaurant.price_range) === 1) {
                priceKey = 'cheap eats';
            } else if (Math.round(restaurant.price_range) === 2) {
                priceKey = 'mid-range';
            } else if (Math.round(restaurant.price_range) === 3) {
                priceKey = 'fine dining';
            } else {
                priceKey = 'unknown';
            };
            return restaurant.restaurant_name.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.type.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(keyword.toLowerCase()) || 
            priceKey.toLowerCase().includes(keyword.toLowerCase())
        });
    } else if (keywordLocation.length) {
        selectedRestaurants = allRestaurants.filter(restaurant => {
            return restaurant.city.toLowerCase().includes(keywordLocation.toLowerCase()) || 
            restaurant.region.toLowerCase().includes(keywordLocation.toLowerCase()) ||
            restaurant.country.toLowerCase().includes(keywordLocation.toLowerCase())
        });
    } else {
        selectedRestaurants = allRestaurants.filter(restaurant => {
            if (Math.round(restaurant.price_range) === 1) {
                priceKey = 'cheap eats';
            } else if (Math.round(restaurant.price_range) === 2) {
                priceKey = 'mid-range';
            } else if (Math.round(restaurant.price_range) === 3) {
                priceKey = 'fine dining';
            } else {
                priceKey = 'unknown';
            };
            return restaurant.restaurant_name.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.type.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(keyword.toLowerCase()) || 
            priceKey.toLowerCase().includes(keyword.toLowerCase())
        });
    }
    
    if (selectedRestaurants.length !== 0) {
        return selectedRestaurants;
    } else {
        return 'no matches found';
    }
};

export const filterRestaurantsByLocation = (keyword, keywordFeature, allRestaurants, filteredRestaurants) => {
    let selectedRestaurants = [];
    let priceKey = 'unknown';

    if (filteredRestaurants.length && typeof filteredRestaurants !== 'string' && keyword.length) {
        selectedRestaurants = filteredRestaurants.filter(restaurant => {
            return restaurant.city.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.region.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.country.toLowerCase().includes(keyword.toLowerCase())
        });
    } else if (keywordFeature.length) {
        selectedRestaurants = allRestaurants.filter(restaurant => {
            if (Math.round(restaurant.price_range) === 1) {
                priceKey = 'cheap eats';
            } else if (Math.round(restaurant.price_range) === 2) {
                priceKey = 'mid-range';
            } else if (Math.round(restaurant.price_range) === 3) {
                priceKey = 'fine dining';
            } else {
                priceKey = 'unknown';
            };
            return restaurant.restaurant_name.toLowerCase().includes(keywordFeature.toLowerCase()) || 
            restaurant.type.toLowerCase().includes(keywordFeature.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(keywordFeature.toLowerCase()) || 
            priceKey.toLowerCase().includes(keywordFeature.toLowerCase())
        });
    } else {
        selectedRestaurants = allRestaurants.filter(restaurant => {
            return restaurant.city.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.region.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.country.toLowerCase().includes(keyword.toLowerCase())
        });
    }

    if (selectedRestaurants.length !== 0) {
        return selectedRestaurants;
    } else {
        return 'no matches found';
    }
};