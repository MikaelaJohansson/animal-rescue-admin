import corgiImage from "../assets/selectableAnimalImages/corgi.jpg";
import dachshundImage from "../assets/selectableAnimalImages/dachshund.jpg";
import dalmatianImage from "../assets/selectableAnimalImages/dalmatian.jpg";
import eurasierImage from "../assets/selectableAnimalImages/eurasier.jpg";
import mixBreedImage from "../assets/selectableAnimalImages/mixBreed.jpg";
import weimaranerImage from "../assets/selectableAnimalImages/sleutloff-weimaraner.jpg";
import vizslaImage from "../assets/selectableAnimalImages/vizsla.jpg";

// Local dog images available for the admin to choose from.
// Stored locally instead of Firebase Storage.
const selectableAnimalImages = [
  {
    id: "corgi",
    src: corgiImage
  },
  {
    id: "dachshund",
    src: dachshundImage
  },
  {
    id: "dalmatian",
    src: dalmatianImage
  },
  {
    id: "eurasier",
    src: eurasierImage
  },
  {
    id: "mixBreed",
    src: mixBreedImage
  },
  {
    id: "weimaraner",
    src: weimaranerImage
  },
  {
    id: "vizsla",
    src: vizslaImage
  }
];

export default selectableAnimalImages;