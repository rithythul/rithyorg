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
            Bios
          </h2>
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            Co-founded SmallWorld, a venture building and startup space, in
            2011. In 2017, we started KOOMPI, an open-source computer company,
            and launched VitaminAir, a pilot natural living community and
            reforestation project. In 2019, our team developed Selendra, a Layer
            1 blockchain network for real-world asset tokenization and loyalty
            programs.
          </p>
          <br />
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            Since 2020, we've built a team of developers creating web3 and
            enterprise software, now collaborating with local and global
            companies.
          </p>
          <br />
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            We developed and maintain a sports ticketing, reverse marketplace
            e-commerce SaaS, and an integrated payment environment for SMEs.
            These projects work together to provide services to businesses,
            developers, and users.
          </p>
        </section>
        <section>
          <h2 className="text-base font-medium mb-2 text-solarized-blue">
            Interests
          </h2>
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            simple living, adventure and bicycle touring, running, startup,
            programming, blockchain, crypto, web3 and DApps, open source,
            community, and nature.
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
            <li>my first book</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
