import { Container, Heading } from "@chakra-ui/react";

export default function About() {
  return (
    <>
      <section id="about-hero" className="h-[450px] center-flex">
        <Heading className="text-5xl" color="white">
          About
        </Heading>
      </section>
      <section
        id="about-content"
        className="dark:text-white text-gray-800 p-6 md:p-12"
      >
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-center">About Us</h1>
            <p className="text-lg leading-relaxed mb-6">
              At <span className="font-bold text-blue-600">Blogify</span>&lsquo;
              we believe in the power of words and the endless possibilities
              they bring. Our mission is to create a platform where ideas&lsquo;
              experiences&lsquo; and stories come together to inspire&lsquo;
              educate&lsquo; and entertain readers from all walks of life.
            </p>

            <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
            <p className="text-lg leading-relaxed mb-6">
              Blogify is a vibrant community of writers&lsquo; thinkers&lsquo;
              and creators passionate about sharing their perspectives on topics
              that matter. From personal anecdotes to expert insights&lsquo; we
              aim to provide a rich&lsquo; diverse collection of articles that
              resonate with readers around the globe.
            </p>

            <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
            <p className="text-lg leading-relaxed mb-6">
              We cover a wide range of topics to cater to every reader&apos;s
              interest:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Travel&amp;Adventure</strong>: Inspiring you to explore
                new horizons and discover the beauty of the world.
              </li>
              <li>
                <strong>Food&amp;Recipes</strong>: Savor the flavors of life
                with delicious recipes and food stories.
              </li>
              <li>
                <strong>Technology&amp;Innovation</strong>: Stay ahead with
                insights on the latest tech trends and innovations.
              </li>
              <li>
                <strong>Health&amp;Wellness</strong>: Practical advice for
                living a healthier&lsquo; happier life.
              </li>
              <li>
                <strong>Lifestyle&amp;Inspiration</strong>: Tips and stories to
                elevate your daily life and spark creativity.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
            <p className="text-lg leading-relaxed mb-6">
              At Blogify&lsquo; we aim to:
            </p>
            <ol className="list-decimal list-inside mb-6 space-y-2">
              <li>
                <strong>Empower Voices</strong>: Provide a platform for
                storytellers to share their unique perspectives.
              </li>
              <li>
                <strong>Foster Connection</strong>: Build a community where
                readers and writers engage&lsquo; exchange ideas&lsquo; and
                learn from each other.
              </li>
              <li>
                <strong>Promote Growth</strong>: Inspire personal and
                professional growth through well-curated&lsquo; informative
                content.
              </li>
            </ol>

            <h2 className="text-2xl font-semibold mb-3">Why Blogify?</h2>
            <p className="text-lg leading-relaxed mb-6">
              <span className="font-bold text-blue-600">Blogify</span> offers:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                <strong>Diverse Content</strong>: Our blog spans multiple
                niches&lsquo; ensuring there’s something for everyone.
              </li>
              <li>
                <strong>Authenticity</strong>: Every article is crafted with
                passion and authenticity.
              </li>
              <li>
                <strong>Community Driven</strong>: We value your feedback and
                suggestions to grow and improve together.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-3">Join the Journey</h2>
            <p className="text-lg leading-relaxed">
              We invite you to explore&lsquo; read&lsquo; and engage with the
              stories shared on Blogify. Whether you’re here to find
              inspiration&lsquo; learn something new&lsquo; or simply enjoy a
              good read&lsquo; we’re excited to have you as part of our
              community.
            </p>
            <p className="text-lg leading-relaxed mt-6 font-semibold text-center">
              <span className="text-blue-600">Let’s Blogify Your World!</span>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
