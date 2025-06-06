/**
 * @file A collection of SVG icon components used throughout the Minesweeper application.
 * Each icon is a functional React component.
 */

import React from 'react';

/**
 * Props for icon components, allowing for custom class names and title attributes.
 */
interface IconProps {
  /** Optional CSS class name(s) to apply to the SVG element. */
  className ? : string;
  /** Optional title for the SVG, often used for accessibility (tooltip). */
  title ? : string;
}

/**
 * FlagIcon component. Represents a flag used to mark suspected mines.
 * @param props - Component props, including `className`.
 */
export const FlagIcon: React.FC < { className ? : string } > = ({ className }) => (
  /*
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M3 3.75A.75.75 0 013.75 3h11.19c.478 0 .924.213 1.213.562l2.25 2.625A.75.75 0 0118 7.5v12.75a.75.75 0 01-1.213.563L13.5 15.375H3.75a.75.75 0 01-.75-.75V3.75zm1.5 0v10.5h8.537l3.25 3.792V7.5L14.938 4.5H4.5z" clipRule="evenodd" />
  </svg>
  */
  
  <svg  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className}>
  <g id="Lager_87" data-name="Lager 87" transform="translate(0)">
    <rect id="Rectangle_46" data-name="Rectangle 46" width="4" height="24" rx="2" transform="translate(0)" />
    <path fillRule="evenodd" id="Path_95" data-name="Path 95" d="M30,0H10A2,2,0,0,0,8,2V18a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V2A2,2,0,0,0,30,0ZM28,15a1,1,0,0,1-1,1H13a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1H27a1,1,0,0,1,1,1Z" />
  </g>
</svg>
  
);


/**
 * MineIcon component. Represents a mine.
 * @param props - Component props, including `className` and `title`.
 */
export const MineIcon: React.FC < IconProps > = ({ className, title }) => (
  /*
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    {title && <title>{title}</title>}
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.056 9.765 9.765 0 014.065 4.065.75.75 0 001.056-1.071A11.265 11.265 0 0012.963 2.286zm-3 3A.75.75 0 008.906 6.342a9.765 9.765 0 01-4.065 4.065.75.75 0 001.071 1.056A11.265 11.265 0 009.963 5.286zM2.286 9.963A.75.75 0 003.342 8.906a9.765 9.765 0 014.065-4.065.75.75 0 00-1.056-1.071A11.265 11.265 0 002.286 9.963zM12 2.25A9.75 9.75 0 002.25 12c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75A9.75 9.75 0 0012 2.25zm0 1.5a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zm-.75 6a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5zM12 8.25a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0112 8.25zm4.5 0a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0v-4.5z" clipRule="evenodd" />
  </svg>
  */
  <svg  viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" fill="none" className={className}>
    {title && <title>{title}</title>}

    <path d="M17 7L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19.5 7.5L20.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M16 3.5L16.5 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M19 5L20 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5.75 8.00337C6.85315 7.36523 8.13392 7 9.5 7C13.6421 7 17 10.3579 17 14.5C17 18.6421 13.6421 22 9.5 22C5.35786 22 2 18.6421 2 14.5C2 13.1339 2.36523 11.8532 3.00337 10.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>
);

/**
 * ClockIcon component. Used for the game timer.
 * @param props - Component props, including `className`.
 */
export const ClockIcon: React.FC < { className ? : string } > = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/**
 * RefreshIcon component. Used for the reset game button.
 * @param props - Component props, including `className`.
 */
export const RefreshIcon: React.FC < { className ? : string } > = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${className}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

/**
 * TrophyIcon component. Used for wins and achievements.
 * @param props - Component props, including `className`.
 */
export const TrophyIcon: React.FC < { className ? : string } > = ({ className }) => (
  /*
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-12 h-12 ${className}`}>
    <path fillRule="evenodd" d="M11.32 2.634A1.5 1.5 0 0112.68 2.634l.284.284c.117.117.117.307 0 .424l-1.102 1.102a.75.75 0 00-1.06 1.06l1.101 1.102c.117.117.307.117.424 0l.284-.284a1.5 1.5 0 012.122 0l.284.284c.117.117.117.307 0 .424l-1.102 1.102a.75.75 0 00-1.06 1.06l1.101 1.102c.117.117.307.117.424 0l.284-.284a1.5 1.5 0 012.122 0l.284.284c.117.117.117.307 0 .424l-1.102 1.102a.75.75 0 00-1.06 1.06l1.101 1.102c.117.117.307.117.424 0l.284-.284a1.5 1.5 0 012.122 0L19.5 15.75h.75a3 3 0 013 3v.75a3 3 0 01-3 3h-15a3 3 0 01-3-3V18.75a3 3 0 013-3h.75l2.121-2.121a1.5 1.5 0 012.121 0l.284.284c.117-.117.117-.307 0-.424l-1.102-1.102a.75.75 0 00-1.06-1.06l1.101-1.102c.117-.117.307-.117.424 0l.284.284a1.5 1.5 0 012.122 0l.284.284c.117-.117.117-.307 0-.424l-1.102-1.102a.zeta5.75 0 00-1.06-1.06l1.101-1.102c.117-.117.307-.117.424 0l.284.284a1.5 1.5 0 012.122 0z" clipRule="evenodd" />
  </svg>
  */
  <svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	  viewBox="0 0 24 24" xml:space="preserve" fill="currentColor" className={`w-12 h-12 ${className}`}>
<path fillRule="evenodd" class="linesandangles_een" d="M24,4H8C4.822,4,3,5.822,3,9c0,2.721,2.399,5.817,4.553,6.895l0.784,0.392
	c0.894,2.99,3.492,5.246,6.663,5.644V24c0,1.105-0.895,2-2,2h-2v2h10v-2h-2c-1.105,0-2-0.895-2-2v-2.069
	c3.171-0.398,5.769-2.654,6.663-5.644l0.784-0.392C26.601,14.817,29,11.721,29,9C29,5.822,27.178,4,24,4z M5,9c0-2.075,0.925-3,3-3
	v7.83C6.427,12.79,5,10.56,5,9z M22,14c0,3.309-2.691,6-6,6s-6-2.691-6-6V6h12V14z M24,13.83V6c2.075,0,3,0.925,3,3
	C27,10.56,25.573,12.79,24,13.83z M11,14h2c0,1.654,1.346,3,3,3v2C13.243,19,11,16.757,11,14z"/>
</svg>
);

/**
 * SadFaceIcon component. Used for losses.
 * @param props - Component props, including `className`.
 */
export const SadFaceIcon: React.FC < { className ? : string } > = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-12 h-12 ${className}`}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.975.435-.975.975s.435.975.975.975.975-.435.975-.975S9.915 8.25 9.375 8.25zm5.25 0c-.54 0-.975.435-.975.975s.435.975.975.975.975-.435.975-.975S15.165 8.25 14.625 8.25zm1.047 5.244a.75.75 0 01-.326 1.016l-3.496 1.647a.752.752 0 01-.652 0l-3.496-1.647a.75.75 0 11.69-1.342l3.152 1.481 3.152-1.481a.75.75 0 011.016.325z" clipRule="evenodd" />
  </svg>
);

/**
 * ChartBarIcon component. Used for statistics.
 * @param props - Component props, including `className`.
 */
export const ChartBarIcon: React.FC < { className ? : string } > = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h1.5c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.035-.84-1.875-1.875-1.875h-1.5ZM12.75 8.625c-1.035 0-1.875.84-1.875 1.875v9.375c0 1.035.84 1.875 1.875 1.875h1.5c1.035 0 1.875-.84 1.875-1.875V10.5c0-1.035-.84-1.875-1.875-1.875h-1.5ZM7.125 15c-1.035 0-1.875.84-1.875 1.875V19.5c0 1.035.84 1.875 1.875 1.875h1.5c1.035 0 1.875-.84 1.875-1.875v-2.625c0-1.035-.84-1.875-1.875-1.875h-1.5Z" />
  </svg>
);

/**
 * StarIcon component. Used for achievements and ratings.
 * @param props - Component props, including `className` and `title`.
 */
export const StarIcon: React.FC < IconProps > = ({ className, title }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    {title && <title>{title}</title>}
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.543 2.833c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);

/**
 * ShieldIcon component. Represents the shield power-up.
 * @param props - Component props, including `className` and `title`.
 */
export const ShieldIcon: React.FC < IconProps > = ({ className, title }) => (
/*
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    {title && <title>{title}</title>}
    <path fillRule="evenodd" d="M12 2.25c-4.066 0-7.723.934-10.163 2.545A.75.75 0 002.25 6.32v8.876c0 2.432.915 4.703 2.507 6.363a.75.75 0 001.09.093A11.163 11.163 0 0012 21.75c1.175 0 2.304-.175 3.352-.501a.75.75 0 00.7-.656l.002-.003c.154-.51.254-1.03.302-1.558a12.642 12.642 0 00.045-1.359c0-2.432-.915-4.703-2.507-6.363a.75.75 0 00-1.09-.093A11.162 11.162 0 0012 6.75c-3.75 0-6.932 1.917-8.63 4.705.034.036.068.072.102.108a.75.75 0 00.958-.096C5.949 9.953 8.787 8.25 12 8.25c.482 0 .953.05 1.414.145a.75.75 0 00.8-.17L15.75 7.5a.75.75 0 00-1.06-1.06l-1.346 1.346A11.212 11.212 0 0012 2.25zM6.996 17.613A9.64 9.64 0 014.5 15.196V6.932a10.412 10.412 0 017.5-2.04c2.01 0 3.884.44 5.463 1.22a.75.75 0 00.758-1.152A11.913 11.913 0 0012 3.75a11.913 11.913 0 00-6.216 1.753.75.75 0 00-.362 1.017l2.575 4.829a.75.75 0 001.36-.412L8.02 8.21a8.192 8.192 0 013.98-.96c.402 0 .795.037 1.177.109a.75.75 0 00.813-.323l1.238-2.2a.75.75 0 00-1.3-.732l-1.238 2.2A9.666 9.666 0 0012 6a9.666 9.666 0 00-4.068 1.035.75.75 0 00-.432 1.033l1.182 3.25a.75.75 0 001.34-.485L8.64 7.832a6.683 6.683 0 013.36-.832c3.69 0 6.668 2.978 6.668 6.668 0 .484-.052.959-.151 1.418a.75.75 0 00.521.869A10.418 10.418 0 0112 20.25a9.645 9.645 0 01-5.004-2.637z" clipRule="evenodd" />
  </svg>
  */
  <svg  viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`} xmlns="http://www.w3.org/2000/svg">
    {title && <title>{title}</title>}
<path d="M11.5 9.00011L10 12.0001H14L12.5 15.0001M20 12.0001C20 16.4612 14.54 19.6939 12.6414 20.6831C12.4361 20.7901 12.3334 20.8436 12.191 20.8713C12.08 20.8929 11.92 20.8929 11.809 20.8713C11.6666 20.8436 11.5639 20.7901 11.3586 20.6831C9.45996 19.6939 4 16.4612 4 12.0001V8.21772C4 7.4182 4 7.01845 4.13076 6.67482C4.24627 6.37126 4.43398 6.10039 4.67766 5.88564C4.9535 5.64255 5.3278 5.50219 6.0764 5.22146L11.4382 3.21079C11.6461 3.13283 11.75 3.09385 11.857 3.07839C11.9518 3.06469 12.0482 3.06469 12.143 3.07839C12.25 3.09385 12.3539 3.13283 12.5618 3.21079L17.9236 5.22146C18.6722 5.50219 19.0465 5.64255 19.3223 5.88564C19.566 6.10039 19.7537 6.37126 19.8692 6.67482C20 7.01845 20 7.4182 20 8.21772V12.0001Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
);

/**
 * EyeIcon component. Represents the "Reveal Safe Cell" power-up.
 * @param props - Component props, including `className` and `title`.
 */
export const EyeIcon: React.FC < IconProps > = ({ className, title }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 ${className}`}>
    {title && <title>{title}</title>}
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113C21.187 17.028 16.97 20.25 12.001 20.25c-4.97 0-9.185-3.223-10.675-7.69a.75.75 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
  </svg>
);

/**
 * CurrencyCoinIcon component. Represents game currency (coins).
 * @param props - Component props, including `className` and `title`.
 */
export const CurrencyCoinIcon: React.FC < IconProps > = ({ className, title }) => (
<svg  viewBox="0 0 24 24" fill="none" className={`w-6 h-6 ${className}`} xmlns="http://www.w3.org/2000/svg">
  {title && <title>{title}</title>}
  
<path d="M12 22.9199C17.5228 22.9199 22 18.4428 22 12.9199C22 7.39707 17.5228 2.91992 12 2.91992C6.47715 2.91992 2 7.39707 2 12.9199C2 18.4428 6.47715 22.9199 12 22.9199Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path fill="currentColor" d="M12.7002 17.1099V18.21C12.7002 18.3877 12.6296 18.5582 12.504 18.6838C12.3783 18.8095 12.2079 18.8799 12.0302 18.8799C11.8525 18.8799 11.6821 18.8095 11.5565 18.6838C11.4308 18.5582 11.3602 18.3877 11.3602 18.21V17.0801C10.9165 17.0072 10.4917 16.8468 10.1106 16.6082C9.72943 16.3695 9.39958 16.0573 9.14023 15.6899C9.04577 15.57 8.99311 15.4226 8.99023 15.27C8.99014 15.1834 9.00762 15.0975 9.04164 15.0178C9.07566 14.9382 9.12551 14.8662 9.18816 14.8064C9.2508 14.7466 9.32494 14.7 9.40608 14.6697C9.48723 14.6393 9.5737 14.6258 9.66023 14.6299C9.74611 14.6294 9.83102 14.648 9.90884 14.6843C9.98667 14.7206 10.0554 14.774 10.1102 14.8401C10.4301 15.258 10.8643 15.574 11.3602 15.75V13.21C10.0302 12.69 9.36023 11.9099 9.36023 10.8999C9.38027 10.3592 9.59279 9.84343 9.95949 9.44556C10.3262 9.04769 10.8229 8.79397 11.3602 8.72998V7.62988C11.3602 7.45219 11.4308 7.2819 11.5565 7.15625C11.6821 7.0306 11.8525 6.95996 12.0302 6.95996C12.2079 6.95996 12.3783 7.0306 12.504 7.15625C12.6296 7.2819 12.7002 7.45219 12.7002 7.62988V8.71997C13.0723 8.77828 13.4289 8.91103 13.7485 9.11035C14.0681 9.30967 14.3442 9.57137 14.5602 9.87988C14.6555 9.99235 14.7117 10.1329 14.7202 10.28C14.7229 10.3657 14.7083 10.451 14.6774 10.531C14.6464 10.611 14.5997 10.684 14.54 10.7456C14.4803 10.8072 14.4088 10.856 14.3298 10.8894C14.2509 10.9228 14.166 10.94 14.0802 10.9399C13.9906 10.9394 13.9022 10.9196 13.8211 10.8816C13.74 10.8436 13.668 10.7884 13.6102 10.72C13.3718 10.4221 13.0574 10.1942 12.7002 10.0601V12.3101L12.9502 12.4099C14.2202 12.9099 15.0102 13.63 15.0102 14.77C14.9954 15.3808 14.7481 15.9629 14.3189 16.3977C13.8897 16.8325 13.3108 17.0871 12.7002 17.1099ZM11.3602 11.73V10.0999C11.1988 10.1584 11.0599 10.2662 10.963 10.408C10.8662 10.5497 10.8162 10.7183 10.8202 10.8899C10.8185 11.0673 10.8688 11.2414 10.9647 11.3906C11.0607 11.5399 11.1981 11.6579 11.3602 11.73ZM13.5502 14.8C13.5502 14.32 13.2202 14.03 12.7002 13.8V15.8C12.9387 15.7639 13.156 15.6427 13.3122 15.459C13.4684 15.2752 13.553 15.0412 13.5502 14.8Z" />
</svg>
);