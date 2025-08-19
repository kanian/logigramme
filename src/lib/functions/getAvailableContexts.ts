import { Home, Users, Briefcase, Coffee, Dumbbell, Book, Music, Car, Heart, Utensils, Phone, Camera, TreePine, ShoppingCart, Gamepad2, GraduationCap, Stethoscope, Building, MapPin, Star } from "lucide-react";


export
const getAvailableContexts = () => ({
  home: { name: 'Home', icon: Home },
  family: { name: 'Family', icon: Users },
  work: { name: 'Work', icon: Briefcase },
  coffee: { name: 'Coffee', icon: Coffee },
  exercise: { name: 'Exercise', icon: Dumbbell },
  study: { name: 'Study', icon: Book },
  music: { name: 'Music', icon: Music },
  commute: { name: 'Commute', icon: Car },
  dating: { name: 'Dating', icon: Heart },
  food: { name: 'Food', icon: Utensils },
  phone: { name: 'Phone', icon: Phone },
  camera: { name: 'Camera', icon: Camera },
  nature: { name: 'Nature', icon: TreePine },
  shopping: { name: 'Shopping', icon: ShoppingCart },
  gaming: { name: 'Gaming', icon: Gamepad2 },
  school: { name: 'School', icon: GraduationCap },
  doctor: { name: 'Doctor', icon: Stethoscope },
  building: { name: 'Building', icon: Building },
  location: { name: 'Location', icon: MapPin },
  hobby: { name: 'Hobby', icon: Star }
});