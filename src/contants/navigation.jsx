import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";

export const navigation  = [
    {
      label : "Movies",
      href : "movie",
      icon : <BiSolidMoviePlay/>
    },
    {
      label : "Tv Shows",
      href : "tv",
      icon : <PiTelevisionFill/>
    }
  ]
  
  export const mobileNavigation = [
    {
      label : "Home",
      href : "/",
      icon : <MdHomeFilled/>
    },
    ...navigation,

    {
        label : "search",
        href : "/search",
        icon : <IoIosSearch/>
    }
  ]