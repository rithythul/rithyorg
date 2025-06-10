export default function About() {
  return (
    <div>
      {/* Terminal prompt simulation */}
      <div className="text-solarized-yellow text-sm mb-4 opacity-70">
        <span>rithy@localhost:~$ whoami</span>
      </div>
      <div className="space-y-4 sm:space-y-6">
        <section>
          <h2 className="text-base font-medium mb-2 text-solarized-blue">
            Interests
          </h2>
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            simple living, adventure and bicycle touring, running, technology
            ventures, computer operating system, computer programming,
            blockchain technology, crypto investing, web3 and DApps development
          </p>
        </section>
        <section>
          <h2 className="text-base font-medium mb-2 text-solarized-blue">
            Bios
          </h2>
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            I co-founded SmallWorld, a venture building and startup space, which
            was established in 2011. In 2017, I started KOOMPI, an open-source
            computer company. That same year, I launched VitaminAir, a
            sustainable living village and reforestation pilot project. In 2019,
            I assembled a team to develop Selendra, a Layer 1 blockchain network
            built with Substrate Framework for real-world asset tokenization and
            loyalty programs.
          </p>

          <br />
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            Since 2020, I have nurtured a team of dedicated young developers to
            build web3 and enterprise-grade software. This team now collaborates
            with other teams from global companies.
          </p>
          <br />

          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            In parallel, I have developed a few startups: 1. in sports
            ticketing, 2. a reverse marketplace for e-commerce, and 3. a payment
            page for online payment integration for startups and SMEs in
            Cambodia.
          </p>
          <br />

          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            These projects leverage each other to provide comprehensive services
            to businesses, developers, and users.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium mb-2 text-solarized-yellow">
            skills
          </h2>
          <ul className="list-disc list-inside ml-4 text-solarized-base0 text-sm font-light">
            <li>linux</li>
            <li>startup</li>
            <li>community</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium mb-2 text-solarized-yellow">
            learning
          </h2>
          <ul className="list-disc list-inside ml-4 text-solarized-base0 text-sm font-light">
            <li>
              <b className="text-solarized-blue font-normal">solidity </b>smart
              contract
            </li>
            <li>
              <b className="text-solarized-blue font-normal">
                rust & typescript
              </b>{" "}
              programming
            </li>
            <li>vipassana meditation</li>
          </ul>
        </section>
        <section>
          <h2 className="text-base font-medium mb-2 text-solarized-yellow">
            Writing
          </h2>
          <ul className="list-disc list-inside ml-4 text-solarized-base0 text-sm font-light">
            <li>my first book by 2025</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
