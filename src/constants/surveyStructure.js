export const surveyOne = {
  surveyId: 123456789,
  surveyName: "Sourcing Roles, Activities and Competencies",
  description: "",
  message:
    "Please take a few minutes to provide information on your work roles and activities as you understand. This survey will just take a few minutes",
  pages: [
    [
      {
        section: [
          {
            heading: "About you",
            description: "",
            components: [
              {
                title: "Name (in full)",
                placeholder: "Your name",
                type: "text",
              },
              {
                title: "Designation (in full)",
                placeholder: "Designation",
                type: "text",
              },
              {
                title: "Work email",
                placeholder: "Official email",
                type: "email",
              },
            ],
          },
          {
            heading: "Reporting officer & department",
            description: "",
            components: [
              {
                title: "Name of your reporting officer (in full)",
                placeholder: "Firstname, Lastname",
                type: "text",
              },
              {
                title: "Designation of your reporting officer (in full)",
                placeholder: "Designation",
                type: "text",
              },
              {
                title: "Your department",
                placeholder: "Department",
                type: "text",
              },
            ],
          },
        ],
      },
    ],

    [
      {
        section: [
          {
            heading: "Roles & Activities",
            description: "List down the 'roles' that you play as part of your current post and activities that are associated with each role. For adding more roles create a new town",
            components: [
              {
                title: "",
                placeholder: "Role label",
                type: "text",
              },
              {
                title: "",
                placeholder: "Describe the role is possible",
                type: "text",
              },
              {
                title: "Activity",
                placeholder: "Activities as part of this role",
                type: "text",
              },
            ],
          },
        ],
      },
    ],

    [
      {
        section: [
          {
            heading: "Roles & Activities",
            description: "List down the 'competencies' that you think are necessary to carry out each role",
            components: [
              {
                title: "Name (in full)",
                placeholder: "Your name",
                type: "text",
              },
              {
                title: "Designation (in full)",
                placeholder: "Designation",
                type: "text",
              },
              {
                title: "Work email",
                placeholder: "Official email",
                type: "email",
              },
            ],
          },
        ],
      },
    ],
  ],
};
