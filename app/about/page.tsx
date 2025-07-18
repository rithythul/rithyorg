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
            companies. We've helped over ~50 startups and installed computer labs
            in 63 schools across Cambodia.
          </p>
          <br />
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            We developed and maintain a sports ticketing, reverse marketplace
            e-commerce SaaS, and an integrated payment environment for SMEs.
            These projects work together to provide services to businesses,
            developers, and users.
          </p>
          <br />
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            I believe in building sustainable businesses that solve real problems,
            growing ecosystems rather than just companies, and finding Cambodia's
            unique strengths instead of copying Silicon Valley.
          </p>
        </section>
        <section>
          <h2 className="text-base font-medium mb-2 text-solarized-blue">
            Interests
          </h2>
          <p className="text-solarized-base0 text-sm font-light leading-relaxed">
            simple living, adventure and bicycle touring across Southeast Asia, 
            running, vipassana meditation practice, startup ecosystem building, 
            programming, blockchain, crypto, web3 and DApps, open source software, 
            community development, and time in nature.
          </p>
        </section>
        <section>
          <h2 className="text-base font-medium mb-2 text-solarized-yellow">
            skills
          </h2>
          <ul className="list-disc list-inside ml-4 text-solarized-base0 text-sm font-light">
            <li>linux systems and open source advocacy</li>
            <li>startup ecosystem development</li>
            <li>community building and mentorship</li>
            <li>venture building and business strategy</li>
            <li>educational technology deployment</li>
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
            <li>working on my first book</li>
            <li>documenting a decade+ of building tech ventures in Cambodia</li>
            <li>sharing lessons from meditation practice and startup life</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
