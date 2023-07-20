import Link from 'next/link';

async function getSearchAge(name: string) {
  const res = await fetch(`https://api.agify.io/?name=${name}`);
  return res.json();
}

async function getSearchGender(name: string) {
  const res = await fetch(`https://api.genderize.io/?name=${name}`);
  return res.json();
}

async function getSearchCountry(name: string) {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`);
  return res.json();
}

interface Params {
  params: { name: string };
}

//dosya adi [name] oldugu icin params: { name: string } seklinde tanimladik

export default async function Page({ params: { name } }: Params) {
  const ageData = getSearchAge(name);
  const genderData = getSearchGender(name);
  const countryData = getSearchCountry(name);

  //toplu sekilde api cagirimi icin Promise.all kullandik
  const [age, gender, country] = await Promise.all([
    ageData,
    genderData,
    countryData,
  ]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='shadow-xl shadow-red-500 p-10 rounded text-2xl font-semibold w-1/2 space-y-2 mb-12'>
        <h1 className='text-3xl font-bold text-red-500 mb-5'>PERSONAL INFO</h1>
        <p>Name: {age?.name}</p>
        <p>Age: {age?.age}</p>
        <p>Gender: {gender?.gender}</p>
        <p>Nationality: {country?.country[0]?.country_id}</p>
      </div>
      <button className='bg-red-500 rounded p-2 px-4 font-semibold hover:scale-105 transform transition-all duration-200'>
        <Link href='/'>Go to Home</Link>
      </button>
    </div>
  );
}
