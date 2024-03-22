// maybe create a separate component for sidebar content

export default function Sidebar() {
  return (
    <div className="h-full w-full overflow-auto bg-white p-5 text-sm font-normal leading-5 text-[#00000099]">
      <div>
        <span>USER GUIDE</span>
        <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold text-black">
          Climate Atlas for Bangladesh{" "}
          <span className="text-[15px] font-light">BETA</span>
        </h2>
        <p className="mb-[22px]">
          The Climate Atlas is a comprehensive tool designed to provide users
          with valuable insights into the climate and environmental landscape of
          Bangladesh. Navigate through districts, explore climate stories, and
          learn about the incredible initiatives shaping the nation's response
          to climate change.
        </p>
        <div className="composition">
          <h4 className="font-bold text-black">DISTRICT NAVIGATION</h4>
          <p className="mb-[22px]">
            Hover over any district on the map to see a brief description of
            that region. Click on the districts to get more specific information
            on GHG emissions, Stories we have from that region, and listed
            entities currently working in that region.{" "}
          </p>
        </div>
        <div className="composition">
          <h4 className="font-bold text-black">INFORMATION CARDS</h4>
          <p className="mb-[22px]">
            Utilize information cards (i cards) to understand key terms and
            concepts related to navigate the website better.{" "}
          </p>
        </div>
        <div className="composition">
          <h4 className="font-bold text-black">SEARCH FUNCTION</h4>
          <p className="mb-[22px]">
            Locate specific districts, NGOs, or initiatives using the search
            bar.Streamline your exploration based on your interests and research
            objectives.{" "}
          </p>
        </div>
        <div className="composition">
          <h4 className="font-bold text-black">FEEDBACKS AND UPDATES</h4>
          <p className="mb-[22px]">
            Share your thoughts and suggestions with us through the provided
            feedback channels.Stay tuned for regular updates as we continue to
            expand and enhance the Climate Atlas for Bangladesh. <br />
            Embark on a journey of discovery, education, and inspiration as you
            explore the Climate Atlas for Bangladesh. Together, let's contribute
            to a more sustainable and resilient future for our planet.
          </p>
        </div>
        <div className="composition">
          <h4 className="font-bold text-black">Data Source:</h4>
          <p className="mb-[22px]">
            World Bank Group, Climate Change Knowledge Portal (2023). URL:{" "}
            <a
              href="https://climateknowledgeportal.worldbank.org/"
              target="_blank"
            >
              https://climateknowledgeportal.worldbank.org/
            </a>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
