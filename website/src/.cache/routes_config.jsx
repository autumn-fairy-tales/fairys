import * as Pages1 from "@/pages";
import * as PagesHome2 from "@/pages/home";
import * as PagesAbout3 from "@/pages/about";
const { default:Pages1Default,...Pages1Other  } = Pages1;
const { default:PagesHome2Default,...PagesHome2Other  } = PagesHome2;
const { default:PagesAbout3Default,...PagesAbout3Other  } = PagesAbout3;

export default [
{ path:"/",...Pages1Other },
	{ path:"/home",...PagesHome2Other },
	{ path:"/about",...PagesAbout3Other },];
