import Image from 'next/image';
import { FaSnapchat, FaInstagram, FaTiktok } from 'react-icons/fa';

interface CreatorCardProps {
  name: string;
  age: number;
  country: string;
  engagementRate: string;
  pricePerVideo: string;
  imageUrl: string;
}

const CreatorCard = ({ name, age, country, engagementRate, pricePerVideo, imageUrl }: CreatorCardProps) => {
  return (
    <div className="bg-white grid grid-cols-2 rounded-lg overflow-hidden shadow-md w-[400px]">
      <div className="relative h-full w-full mb-4 col-span-1">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="space-y-2 p-4 col-span-1">

        <div className="flex flex-col justify-between gap-2 space-y-2">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-semibold">{name}</p>
          </div>
          <div className="text-right">
            <div className="flex gap-2">
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-semibold">{age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-semibold">{country}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Engagement Rate</p>
          <p className="font-semibold">{engagementRate}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500">Price Per Video</p>
          <p className="font-semibold">{pricePerVideo}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-500 mb-2">Interested Socials</p>
          <div className="flex gap-2">
            <FaSnapchat className="text-xl text-gray-600" />
            <FaInstagram className="text-xl text-gray-600" />
            <FaTiktok className="text-xl text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CreatorsProfile() {
  const creators = Array(6).fill({
    name: 'Peggy Roxy',
    age: 24,
    country: 'Italy',
    engagementRate: '0.5%',
    pricePerVideo: '100$',
    imageUrl: '/images/register.webp',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Creators Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creators.map((creator, index) => (
          <CreatorCard key={index} {...creator} />
        ))}
      </div>
    </div>
  );
}
