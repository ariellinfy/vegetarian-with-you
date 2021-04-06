export const filterRestaurants = (keyword, allRestaurants) => {
    const filteredRestaurants = allRestaurants.filter(restaurant => {
        return restaurant.restaurant_name.toLowerCase().includes(keyword.toLowerCase()) || 
        restaurant.type.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(keyword.toLowerCase()) || 
        restaurant.price_range.toLowerCase().includes(keyword.toLowerCase()) || 
        restaurant.city.toLowerCase().includes(keyword.toLowerCase()) || 
        restaurant.region.toLowerCase().includes(keyword.toLowerCase()) ||
        restaurant.country.toLowerCase().includes(keyword.toLowerCase())
    });

    if (filteredRestaurants.length !== 0) {
        return filteredRestaurants;
    } else {
        return 'no matches found';
    };
};

export const filterRestaurantsByFeature = (keyword, allRestaurants, filteredRestaurants) => {
    let selectedRestaurants = [];
    if (filteredRestaurants.length && typeof filteredRestaurants !== 'string') {
        selectedRestaurants = filteredRestaurants.filter(restaurant => {
            return restaurant.restaurant_name.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.type.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.price_range.toLowerCase().includes(keyword.toLowerCase())
        });
    } else {
        selectedRestaurants = allRestaurants.filter(restaurant => {
            return restaurant.restaurant_name.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.type.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.cuisine.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.price_range.toLowerCase().includes(keyword.toLowerCase())
        });
    }
    
    if (selectedRestaurants.length !== 0) {
        return selectedRestaurants;
    } else {
        return 'no matches found';
    };
};

export const filterRestaurantsByLocation = (keyword, allRestaurants, filteredRestaurants) => {
    let selectedRestaurants = [];
    if (filteredRestaurants.length && typeof filteredRestaurants !== 'string') {
        selectedRestaurants = filteredRestaurants.filter(restaurant => {
            return restaurant.city.toLowerCase().includes(keyword.toLowerCase()) || 
            restaurant.region.toLowerCase().includes(keyword.toLowerCase()) ||
            restaurant.country.toLowerCase().includes(keyword.toLowerCase())
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
    };
};