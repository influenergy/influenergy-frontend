import Header from "@/components/home/Header";
import Image from "next/image";

export default function BlogDetails() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden ">
      {/* Header Section */}
      <Header />

      {/* Image Section */}
      <div className="relative h-96 w-full ">
        <Image
          src="/landing/blog/blogdetails.png"
          alt="Blog Post Header Image"
          fill
          objectFit="cover"
          className="w-full"
        />
        <h1 className="absolute bottom-16 left-16 text-4xl font-bold text-white text-left w-full">
          How We Find Influencers <br /> To Promote Your Brand
        </h1>
      </div>

      {/* Content Section */}
      <main className="container mx-auto px-4 py-8 ">
        <article className="bg-white  rounded-lg p-8">
          <p className="text-gray-700 leading-relaxed">
            In today digital landscape, connecting with influencers is a
            powerful strategy for brands seeking to enhance their visibility and
            engagement. However, reaching out to influencers effectively
            requires a thoughtful approach that prioritizes personalization,
            relationship-building, and clear communication. At Influenergy,
            we have developed a unique method for connecting brands with global
            content creators. Here is how you can do the same, along with
            insights into our process.
          </p>

          {/* Step 1 */}
          <h2 className="text-4xl font-semibold text-primary mt-8 mb-4">
            Step 1: Identify the Right Influencers
          </h2>
          <p className="text-gray-700 leading-relaxed">
            The first step in your outreach strategy is identifying influencers
            who align with your brand values and target audience. This involves:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4 ml-4">
            <li>
              Research: Compile a list of potential influencers based on their
              niche, engagement rates, and authenticity.
            </li>
            <li>
              Personal Interviews: At Influenergy, we take this a step further
              by personally interviewing global content creators. This
              meticulous process allows us to filter out their characteristics
              and assess their compatibility with brand collaborations. We
              believe that our strength lies in the individuals we collaborate
              with—not just data from machines.
            </li>
          </ul>

          {/* Step 2 */}
          <h2 className="text-4xl font-semibold text-primary mt-8 mb-4">
            Step 2: Engage with Their Content
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Before reaching out, it&apos;s essential to engage with the influencer&apos;s
            content. Here&apos;ss how:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4 ml-4">
            <li>
              Interact: Like, comment on, and share their posts to establish
              familiarity and show genuine interest in their work.
            </li>
            <li>
              Build Rapport: By engaging authentically, you create a foundation
              for a positive relationship.
            </li>
          </ul>

          {/* Step 3 */}
          <h2 className="text-4xl font-semibold text-primary mt-8 mb-4">
            Step 3: Choose the Right Communication Channels
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Selecting the appropriate channel for outreach is crucial:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4 ml-4">
            <li>
              Email vs. DMs: While direct messaging (DM) on social media can be
              effective, email is often preferred for professional outreach.
              Look for an email address in their bio or website. If unavailable,
              a polite DM can be a good alternative.
            </li>
            <li>
              Professionalism: Use a professional email address and signature to
              convey credibility.
            </li>
          </ul>

          {/* Step 4 */}
          <h2 className="text-4xl font-semibold text-primary mt-8 mb-4">
            Step 4: Craft a Personalized Pitch
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your outreach should be tailored and specific. Include:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4 ml-4">
            <li>
              Introduction: A brief introduction of yourself and your brand.
            </li>
            <li>
              Compliments: Specific compliments about their content to
              demonstrate familiarity.
            </li>
            <li>
              Proposal: A clear outline of what you&apos;sre offering and what you
              expect from them.
            </li>
          </ul>

          {/* Step 5 */}
          <h2 className="text-4xl font-semibold text-primary mt-8 mb-4">
            Step 5: Build Relationships
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Focus on developing long-term relationships rather than one-off
            collaborations. At Influenergy:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4 ml-4">
            <li>
              Sustainable Partnerships: We connect with brands that share
              long-term sustainable views and embrace diverse opportunities.
            </li>
            <li>
              Genuine Connections: Our focus on authentic human connection
              extends to our partnerships with brands that align with our
              vision.
            </li>
          </ul>

          {/* Step 6 */}
          <h2 className="text-4xl font-semibold text-primary mt-8 mb-4">
            Step 6: Provide Support
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Support is key to successful collaborations:
          </p>
          <ul className="list-disc list-inside text-gray-700 mt-4 ml-4">
            <li>
              Ongoing Assistance: Offer unwavering support to both influencers
              and brands throughout the collaboration process.
            </li>
            <li>
              Mutual Benefits: At Influenergy, we create mutually beneficial
              scenarios by ensuring both parties feel valued and supported.
            </li>
          </ul>

          {/* Conclusion */}
          <h2 className="text-4xl font-semibold text-primary mt-8 mb-4">
            Conclusion
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By following these steps and incorporating Influenergy&apos;ss approach of
            personal interviews and genuine human connections, you&apos;sll increase
            your chances of successfully connecting with influencers who can
            effectively promote your brand. Remember, the key is to focus on
            building authentic relationships and providing value to both the
            influencers and your brand. With the right strategy in place, you
            can turn influencer partnerships into powerful marketing tools that
            drive engagement and growth for your business.
          </p>
        </article>
      </main>
    </div>
  );
}
