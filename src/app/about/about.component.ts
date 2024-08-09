import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core'

interface sectionsType {
    title: string;
    contentList: { subTitle?: string, subContent: string }[];
}

interface contactType {
    email: string,
    mobile: number,
}
@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
    content: string = '';
    greeting: string = '';
    speed: number = 50;
    introSpeech: string = '';
    sections: sectionsType[] = [];
    play: boolean = true;
    interval: any;
    contactDetails: contactType = {email: '', mobile: 0}

    @ViewChild('cardWrapper', { static: true }) cardWrapper?: ElementRef;

    constructor(private renderer: Renderer2) { }
    ngOnInit(): void {
        this.fetchData();
        this.typeData();
    }

    private fetchData(): void {
        this.greeting = "Hello";
        this.introSpeech = "I am Rohan Ramhari Jadhav, a highly skilled and enthusiastic full-stack web developer with extensive expertise in modern web technologies. My expertise includes HTML5, CSS3, JavaScript, Angular, React.js, TypeScript and RxJS. I am passionate about building high-performance, engaging web applications and creating user-centric digital solutions.";
        this.sections = [
            {
                title: "My Expertise",
                contentList: [
                    {
                        subTitle: "HTML5 & CSS3",
                        subContent: "Expert in developing visually appealing, responsive web interfaces that deliver a seamless experience across all devices and browsers."
                    },
                    {
                        subTitle: "JavaScript & TypeScript",
                        subContent: "Proficient in JavaScript and TypeScript to create dynamic, interactive applications with robust functionality."
                    },
                    {
                        subTitle: "Angular & React Js",
                        subContent: "Experienced in using Angular and React.js to develop scalable, maintainable and high-performance front-end solutions. I have created and maintained complex admin dashboards and integrated various UI elements to enhance user experience."
                    },
                    {
                        subTitle: "RxJS",
                        subContent: "Use RxJS for reactive programming to efficiently manage asynchronous data streams and improve application performance."
                    },
                    {
                        subTitle: "AWS",
                        subContent: "My expertise in Amazon Web Services (AWS) ensures that the applications I build are not only functional but also scalable, secure, and cost-effective."
                    },
                    {
                        subTitle: "Node Js",
                        subContent: "Complement my full-stack skills with Node.js to develop efficient server-side applications."
                    },
                    {
                        subTitle: "Database",
                        subContent: "Proficient in MySQL and MongoDB, designed and managed databases for robust data handling and storage"
                    },
                    {
                        subTitle: "Rest API",
                        subContent: "Experienced in building and integrating RESTful APIs for seamless communication between application components."
                    },
                    {
                        subTitle: "Tools & Platforms",
                        subContent: "Proficient in Git, GitHub, Bitbucket, GitLab and Docker for version control, collaboration and containerization."
                    }
                ]
            },
            {
                title: "Key Projects",
                contentList: [
                    {
                        subTitle: "Admin Dashboard",
                        subContent: "Developed and maintained admin dashboard using HTML, CSS3, JavaScript, Angular, and React.js. Enhanced the user interface with Angular, Tailwind CSS and React Material-UI for a refined design and added interactive features to increase performance by optimizing the Lighthouse score."
                    },
                    {
                        subTitle: "UI Enhancements",
                        subContent: "Integrated PrimeNg UI components to improve user experience and ensure seamless functionality. Designed and implemented scripts to retrieve and compare PI server data, ensuring data accuracy. Managed client-side JWT token authentication to enhance data security."
                    },
                    {
                        subTitle: "Interactive Interfaces",
                        subContent: "Built an intuitive user interface using modern JavaScript frameworks, HTML5 and CSS3 with a focus on Angular to provide a smooth user experience. Fixed UI-related issues by handling SonarQube code quality issues and improved project functionality."
                    }
                ]
            },
            {
                title: "My Approach",
                contentList: [
                    {
                        subContent: "I'm not just a developer; I am a problem solver committed to delivering exceptional user experience. My focus is on clean, efficient code, performance optimization and staying up to date with the latest industry trends. I believe in a collaborative approach, working closely with designers, developers and stakeholders to achieve project goals and exceed expectations."
                    }
                ]
            },
            {
                title: "Why Choose Me",
                contentList: [
                    {
                        subTitle: "Cutting-Edge Knowledge",
                        subContent: "I keep up to date with the latest developments in web technology to provide the most advanced solutions to your project."
                    },
                    {
                        subTitle: "Team-Oriented",
                        subContent: "My collaborative nature ensures effective communication and teamwork with all project members."
                    },
                    {
                        subTitle: "Commitment to Excellence",
                        subContent: "I am dedicated to delivering high-quality projects on time and on budget, adhering to the highest standards of performance and efficiency."
                    }
                ]
            },
            {
                title: "Get in Touch",
                contentList: [
                    {
                        subContent: "I am always eager to take on new challenges and contribute to your success through technology. If you are looking for a versatile developer to bring your web and mobile applications to life, feel free to get in touch. Let's discuss how I can be a valuable asset to your next project."
                    }
                ]
            }
        ]

        this.contactDetails = {
            email: 'jadhavrohan5050@gmail.com',
            mobile: 9673623463,
        }
    }

    async typeData() {
        (this.cardWrapper?.nativeElement).innerHTML='';
        //printing greeting word
        const greetingChar = [...(this.greeting).trim(), ',']
        const greetingEle = await this.createHtmlElement('span', this.cardWrapper?.nativeElement, greetingChar, 'greeting');

        //printing introSpeech
        const introChar = [...(this.introSpeech).trim()]
        const introEle = await this.createHtmlElement('p', this.cardWrapper?.nativeElement, introChar, 'intro-speech')

        // printing each section 
        for (let i = 0; i < this.sections.length;) {
            const div = await this.createHtmlElement('div', this.cardWrapper?.nativeElement, [], 'section');

            const title = [...(this.sections[i].title).trim(), ':']
            const h3 = await this.createHtmlElement('h3', div, title, 'section-left')

            const ul = await this.createHtmlElement('ul', div, [], 'section-right');
            for (let j = 0; j < this.sections[i].contentList.length;) {
                const li = await this.createHtmlElement('li', ul, []);
                const subTitle = this.sections[i].contentList[j].subTitle?.trim();
                if (subTitle !== undefined) {
                    const firstSpan = await this.createHtmlElement('span', li, [...subTitle, ': '], 'subtitle');
                }

                const subContent = [...this.sections[i].contentList[j].subContent.trim(), ' '];
                const secondSpan = await this.createHtmlElement('span', li, subContent);
                ++j;
            }

            ++i;
        }


        const contactSection = await this.createHtmlElement('div', this.cardWrapper?.nativeElement, [], 'contact-section');
        
        const contactLeft = await this.createHtmlElement('div', contactSection, [], 'contact-left');
        const contactLeftP = await this.createHtmlElement('p', contactLeft, [...'Email: '])
        const contactLeftA = await this.createHtmlElement('a', contactLeft, [...this.contactDetails.email])
        this.renderer.setAttribute(contactLeftA, 'href', `mailto:${this.contactDetails.email}`)
        const contactRight = await this.createHtmlElement('div', contactSection, [],'contact-right');
        const contactRightP = await this.createHtmlElement('p', contactRight, [...'Mobile: '])
        const contactRightA = await this.createHtmlElement('a', contactRight, [...this.contactDetails.mobile.toString()])

        const btnSection = await this.createHtmlElement('div', this.cardWrapper?.nativeElement, [], 'btn-section')
        const btnA = await this.createHtmlElement('a', btnSection, [..."Download CV"])
        this.renderer.setAttribute(btnA, 'href', `https://drive.google.com/uc?export=download&id=1NkX131LJs0GWxr75qGv9mQVB3RbNwwNz`)
        const btnB = await this.createHtmlElement('a', btnSection, [..."Hire Me Now"]);
        this.renderer.setAttribute(btnB, 'href', '#')
        
    }

    // creating HTML elements 
    private createHtmlElement(tag: string, target: any, content?: string[], className?: string) {
        return new Promise((resolve) => {
            const ele = this.renderer.createElement(tag);
            if (className) {
                this.renderer.setAttribute(ele, 'class', className);
            }

            if (!content) {
                resolve(ele)
                return;
            }

            let idx = 0;
            
            if(this.play) {
                this.interval = setInterval(() => {
                    if (idx < content.length) {
                        this.renderer.appendChild(ele, this.renderer.createText(content[idx]));
                        ++idx;
                    }
                    else {
                        clearInterval(this.interval)
                        resolve(ele);
                    }
                }, this.speed);
            }
            else {
                while(true) {
                    if (idx < content.length) {
                        this.renderer.appendChild(ele, this.renderer.createText(content[idx]));
                        ++idx;
                    }
                    else {
                        resolve(ele);
                        break;
                    }
                }
            }
            this.scrollDown();
            this.renderer.appendChild(target, ele)
        })
    }

    private scrollDown(): void {
        window.scrollTo(0, document.body.scrollHeight);
    }

    ngOnDestroy(): void {
        if(this.interval) {
            clearInterval(this.interval)
        }
    }


    onToggle(value: boolean): void {
        if(!this.play) return;
        this.play = value;
        if(this.interval) {
            clearInterval(this.interval)
        }
        this.typeData();
    }
}