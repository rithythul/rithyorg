import { AbstractProfile } from '../components/abstractProfile'

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">about</h1>
      <div className="mb-8 w-full">
	<div className="relative w-full h-[200px]">
	<div className="relative w-full h-[200px] border rounded-lg overflow-hidden">
          <AbstractProfile />
        </div>
	</div>
      </div>
      <div className="space-y-6">
	<section>
	  <h2 className="text-xl font-semibold mb-2">background</h2>
	  <p>
	    i'm [your name], an advertising and multimedia professional with over 12 years
	    of experience in the industry. my journey in this field has been driven by a
	    passion for creativity and a deep understanding of technology.
	  </p>
	</section>
	<section>
	  <h2 className="text-xl font-semibold mb-2">experience</h2>
	  <p>
	    throughout my career, i've had the privilege of working with a diverse range of
	    clients, from small local businesses to large multinational corporations. this
	    experience has given me a unique perspective on how to create impactful digital
	    experiences that resonate with various audiences.
	  </p>
	</section>
	<section>
	  <h2 className="text-xl font-semibold mb-2">skills</h2>
	  <ul className="list-disc list-inside ml-4">
	    <li>web development (html, css, javascript, react, node.js)</li>
	    <li>digital marketing and seo</li>
	    <li>ui/ux design</li>
	    <li>content creation and management</li>
	    <li>data analysis and visualization</li>
	  </ul>
	</section>
	<section>
	  <h2 className="text-xl font-semibold mb-2">approach</h2>
	  <p>
	    i'm constantly learning and adapting to new technologies and methodologies in
	    the ever-evolving digital landscape. my goal is to help businesses and
	    individuals not just keep up with digital trends, but to stay ahead of the curve
	    and stand out in their respective markets.
	  </p>
	</section>
	<section>
	  <h2 className="text-xl font-semibold mb-2">outside of work</h2>
	  <p>
	    when i'm not working, you can find me exploring new technologies, contributing
	    to open-source projects, or sharing my knowledge through writing and speaking
	    engagements.
	  </p>
	</section>
      </div>
    </div>
  )
}
