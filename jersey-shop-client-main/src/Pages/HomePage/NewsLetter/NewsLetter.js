import React from 'react';
import newsLetterImg from "../../../assets/newsletter.png"
const NewsLetter = () => {
    return (
        <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100 mt-14 mb-10">
            <div className="flex flex-col justify-between">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let's talk!</h2>
                    <div className="dark:text-gray-400">Email with your requirement of your very next JERSEY.</div>
                </div>
                <img src={newsLetterImg} alt="Contact our customer support" className="w-[300px] mt-8" />
            </div>
            <form className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div>
                    <label htmlFor="name" className="text-sm">Full name</label>
                    <input id="name" type="text" placeholder="Your name" className="w-full p-3 rounded dark:bg-gray-800" />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <input id="email" type="email" placeholder="Your email" className="w-full p-3 rounded dark:bg-gray-800" />
                </div>
                <div>
                    <label htmlFor="message" className="text-sm">Message</label>
                    <textarea id="message" rows="3" placeholder="Your message" className="w-full p-3 rounded dark:bg-gray-800"></textarea>
                </div>
                <button type="submit" className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-violet-400 dark:text-gray-900">Send Message</button>
            </form>
        </div>
    );
};

export default NewsLetter;