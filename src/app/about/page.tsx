import { AbstractProfile } from '../components/abstractProfile'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">about</h1>
      <div className="mb-8 w-full">
	<div className="relative w-full h-[200px]">
	<div className="relative w-full h-[200px] border rounded-lg overflow-hidden">
          <AbstractProfile />
        </div>
	</div>
      </div>
      <div className="space-y-6">
	<section>
	  <h2 className="text-xl font-semibold mb-2">Interests</h2>
	  <p>
	  simple living, adventure touring, long distance bicycling, running, tech ventures, operating system, programming, blockchain, crypto, web3, investing
	  </p>
	</section>
	<section>
	  <h2 className="text-xl font-semibold mb-2">Bios</h2>
	  <p>
	  I co-founded SmallWorld, a venture building and startup space, which was established in 2011. In 2017, I started KOOMPI, an open-source computer company. That same year, I launched VitaminAir, a sustainable living village and reforestation pilot project. In 2019, I assembled a team to develop Selendra, a Layer 1 blockchain network built with Substrate Framework for real-world asset tokenization and loyalty programs.
	  </p>
	  
	  <br />
	  <p>
	  Since 2020, I have nurtured a team of dedicated young developers to build web3 and enterprise-grade software. This team now collaborates with other teams from global companies.
	  </p>
	  <br />
	  
	  <p>In parallel, I have developed three additional startups: 1. in sports ticketing, 2. a reverse marketplace for e-commerce, and 3. a payment page for online payment integration for startups and SMEs in Cambodia.
	  </p>
	  <br />

	  
	  <p>
	  These projects leverage each other to provide comprehensive services to businesses, developers, and users.
	  </p>

	</section>

	<section>
	  <h2 className="text-xl font-semibold mb-2">skills</h2>
	  <ul className="list-disc list-inside ml-4">
	    <li>linux and bash </li>
	    <li>project management</li>
	    <li>startup</li>
	    <li>community building</li>
	  </ul>
	</section>

	<section>
	  <h2 className="text-xl font-semibold mb-2">learning</h2>
	  <ul className="list-disc list-inside ml-4">
	    <li>smart contract with <b> solidity</b> </li>
	    <li>programming (<b>rust, typescript</b>)</li>
	    <li>writing my first book</li>
	    <li>vipassana meditation</li>
	  </ul>
	</section>
  	
  	</div>
    </div>
  )
}
