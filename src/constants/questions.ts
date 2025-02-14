export const questions = {
  step1:{
    title:'Lets Create Your Profile',
    description:'In order to match you with the right brands, we need a few more details',
    fields: [
      {
        title: "Gender",
        category:"dropdown",
        options: [
          "Male",
          "Female",
          "Non-binary",
          "Prefer not to say",
        ],
      },
      {
        title: "Your City",
        category:"dropdown",
        options: [
          "New York",
          "Los Angeles",
          "Delhi",
          "Mumbai",
          "London",
          "Sydney",
        ],
      },
      {
        title: "Date of Birth",
        category:'date'
      },
      {
        title: "Phone Number",
        category:'number'
      },
    ],
  },
  step2: {
    title:'Select Your Preferred Categories',
    description:'This helps fine tune your brand matches',
    fields:[
      {
        title: "Categories",
        category: "dropdown",
        options: [    
          "Fashion & Apparel",
          "Beauty & Skincare",
          "Health & Wellness",
          "Food & Beverage",
          "Technology & Electronics",
          "Travel & Hospitality",
          "Education & E-learning",
          "Entertainment & Media",
          "Others",
        ],
      },
    ],
  },
  step3:{
    title:'We Would Love to Know More About You',
    description:'This helps fine tune your brand matches',
    fields:[
      {
        title:"What type of content do you enjoy creating the most?",
        category:"text"
      },
      {
        title:'What tools and platforms do you use for content creation?',
        category:'text'
      },
      {
        title:'What type of content do you enjoy creating the most?',
        category:'text'
      },
      {
        title:'What tools and platforms do you use for content creation?',
        category:'text'
      }
    ]
  }
};
