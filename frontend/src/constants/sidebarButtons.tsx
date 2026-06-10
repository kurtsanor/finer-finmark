import React from "react";

export const customerNavigations = [
  {
    category: "Menu",
    items: [
      {
        name: "Overview",
        path: "/",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg
            width="15"
            height="15"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.4167 1.75H1.75V13.4167H13.4167V1.75Z"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M31.75 1.75H20.0833V13.4167H31.75V1.75Z"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M31.75 20.0833H20.0833V31.75H31.75V20.0833Z"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.4167 20.0833H1.75V31.75H13.4167V20.0833Z"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      },
      {
        name: "Shop",
        path: "/shop",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg
            width="15"
            height="15"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.3333 28V6.66667C21.3333 5.95942 21.0524 5.28115 20.5523 4.78105C20.0522 4.28095 19.3739 4 18.6667 4H13.3333C12.6261 4 11.9478 4.28095 11.4477 4.78105C10.9476 5.28115 10.6667 5.95942 10.6667 6.66667V28M5.33332 9.33333H26.6667C28.1394 9.33333 29.3333 10.5272 29.3333 12V25.3333C29.3333 26.8061 28.1394 28 26.6667 28H5.33332C3.86056 28 2.66666 26.8061 2.66666 25.3333V12C2.66666 10.5272 3.86056 9.33333 5.33332 9.33333Z"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      },
      {
        name: "Cart",
        path: "/cart",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg
            width="15"
            height="15"
            viewBox="0 0 40 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.66666 1.5H8.33332L12.8 21.585C12.9524 22.2756 13.3698 22.8959 13.9792 23.3374C14.5886 23.779 15.3512 24.0135 16.1333 24H32.3333C33.1155 24.0135 33.878 23.779 34.4874 23.3374C35.0968 22.8959 35.5142 22.2756 35.6667 21.585L38.3333 9H9.99999M16.6667 31.5C16.6667 32.3284 15.9205 33 15 33C14.0795 33 13.3333 32.3284 13.3333 31.5C13.3333 30.6716 14.0795 30 15 30C15.9205 30 16.6667 30.6716 16.6667 31.5ZM35 31.5C35 32.3284 34.2538 33 33.3333 33C32.4128 33 31.6667 32.3284 31.6667 31.5C31.6667 30.6716 32.4128 30 33.3333 30C34.2538 30 35 30.6716 35 31.5Z"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      },
      {
        name: "Orders",
        path: "/orders",
        icon: (props: React.SVGProps<SVGSVGElement>) => (
          <svg
            width="15"
            height="15"
            viewBox="0 0 40 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6667 23.4167V1.75H1.66666V23.4167H26.6667ZM26.6667 23.4167H38.3333V15.0833L33.3333 10.0833H26.6667L26.6667 23.4167ZM13.3333 27.5833C13.3333 29.8845 11.4678 31.75 9.16666 31.75C6.86547 31.75 4.99999 29.8845 4.99999 27.5833C4.99999 25.2821 6.86547 23.4167 9.16666 23.4167C11.4678 23.4167 13.3333 25.2821 13.3333 27.5833ZM35 27.5833C35 29.8845 33.1345 31.75 30.8333 31.75C28.5321 31.75 26.6667 29.8845 26.6667 27.5833C26.6667 25.2821 28.5321 23.4167 30.8333 23.4167C33.1345 23.4167 35 25.2821 35 27.5833Z"
              stroke="black"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        ),
      },
    ],
  },
];
