const floors = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const roomTypes = ["1R", "1K", "1DK", "1LDK", "2K", "2DK", "2LDK", "3K"];
const stations = [
  "Shinjuku",
  "Tokyo",
  "Shibuya",
  "Ikebukuro",
  "Shinagawa",
  "Ueno",
  "Akihabara",
  "Ginza",
  "Asakusa",
  "Roppongi",
];
const wards = [
  "Shinjuku Ward",
  "Chiyoda Ward",
  "Shibuya Ward",
  "Toshima Ward",
  "Minato Ward",
  "Taito Ward",
  "Chiyoda Ward",
  "Chuo Ward",
  "Taito Ward",
  "Minato Ward",
];
const city = "Tokyo";
const minutes = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const roomSizes = {
  "1R": [10, 20],
  "1K": [15, 25],
  "1DK": [20, 30],
  "1LDK": [25, 35],
  "2K": [25, 35],
  "2DK": [30, 40],
  "2LDK": [35, 50],
  "3K": [40, 55],
};
const feeRange = [2000, 10000];
const randomNames = [
  "name1",
  "name2",
  "name3",
  "name4",
  "name5",
  "name6",
  "name7",
  "name8",
  "name9",
];
const amenitiesList = [
  "Wifi",
  "Full kitchen",
  "Washer & Dryer",
  "Free Parking",
  "Swimming Pool",
  "Hot Tub",
  "24/7 Security",
  "Wheelchair Accessible",
  "Elevator Access",
  "Dishwasher",
  "Gym/Fitness Center",
  "Air Conditioning",
  "Balcony/Patio",
  "Smart TV",
  "Coffee Maker",
];

function getFloorSuffix(floor) {
  switch (floor) {
    case 1:
      return "1st";
    case 2:
      return "2nd";
    case 3:
      return "3rd";
    default:
      return `${floor}th`;
  }
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomRoomSize(roomType) {
  const [minSize, maxSize] = roomSizes[roomType];
  return getRandomValue(minSize, maxSize);
}

function getRandomPrice(roomSize) {
  const price = roomSize * getRandomValue(1000, 2000); // Assuming price is based on size (1000 to 2000 per m²)
  return Math.max(price, 40000); // Ensure the price is at least 40000
}

function getRandomFee() {
  return getRandomValue(feeRange[0], feeRange[1]);
}

function getRandomDeposit(price) {
  return Math.random() < 0.5
    ? price
    : Math.floor((price * getRandomValue(90, 100)) / 100);
}

function getRandomPhoneNumber() {
  const randomDigit = getRandomValue(2, 9);
  return `011-1111-1111`.replace(/1/g, randomDigit);
}

function getRandomAmenities() {
  const shuffled = amenitiesList.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, getRandomValue(3, 6)); // Select between 3 to 6 random amenities
  return selected;
}

// Combine all functions to create a property object

function getListingName(stationIndex) {
  const randomRoomType = roomTypes[getRandomIndex(roomTypes)];
  const randomFloor = floors[getRandomIndex(floors)];

  return {
    type: randomRoomType,
    name: `${stations[stationIndex]} ${randomRoomType} ${getFloorSuffix(randomFloor)} floor`,
    station: stations[stationIndex],
    floor: randomFloor,
    ward: wards[stationIndex],
  };
}

function getDescription(listing, distance) {
  return `${listing.station} ${listing.type}, ${getFloorSuffix(listing.floor)} floor - ${distance} minutes walk, ${listing.ward}, ${city}`;
}

function getRoomLocation(stationIndex, floor) {
  return {
    station: `${stations[stationIndex]} Station`,
    ward: wards[stationIndex],
    city: city,
    floor: floor.toString(),
  };
}

function getRoomInfo(randomRoomType) {
  const randomAge = getRandomValue(1, 9);
  const randomDistance = getRandomValue(1, 9);
  const roomSize = getRandomRoomSize(randomRoomType);

  return {
    type: randomRoomType,
    age: randomAge.toString(),
    distance: randomDistance.toString(),
    square_meter: roomSize.toString(),
  };
}

function getRoomCost(roomInfo) {
  const price = getRandomPrice(parseInt(roomInfo.square_meter));
  const fee = getRandomFee();
  const deposit = getRandomDeposit(price);

  return {
    monthly: price.toString(),
    fee: fee.toString(),
    deposit: deposit.toString(),
  };
}

function getSellerInfo() {
  const sellerName = randomNames[getRandomIndex(randomNames)];
  const sellerEmail = `${sellerName.toLowerCase()}@mail.com`;
  const sellerPhone = getRandomPhoneNumber();

  return {
    name: sellerName,
    email: sellerEmail,
    phone: sellerPhone,
  };
}

export default function createProperty() {
  const stationIndex = getRandomIndex(stations);
  const listing = getListingName(stationIndex);
  const roomInfo = getRoomInfo(listing.type);
  const description = getDescription(listing, roomInfo.distance);
  const roomLocation = getRoomLocation(stationIndex, listing.floor);
  const roomCost = getRoomCost(roomInfo);
  const sellerInfo = getSellerInfo();
  const amenities = getRandomAmenities();

  return {
    type: listing.type,
    name: listing.name,
    description: description,
    location: roomLocation,
    age: roomInfo.age,
    distance: roomInfo.distance,
    square_meter: roomInfo.square_meter,
    amenities: amenities,
    cost: roomCost,
    seller_info: sellerInfo,
    images: [],
  };
}
