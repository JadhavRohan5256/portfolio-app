import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core'
import { interval } from 'rxjs';

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
        this.introSpeech = "I'm Rohan Ramhari Jadhav, a passionate and dedicated full stack web developer with a diverse skill set encompassing HTML5, CSS3, JavaScript, Angular, React.js, React Native, AWS, Spring Boot, and Hibernate. I thrive on creating immersive and user-friendly web applications, and my journey in the world of web development has been an exciting adventure.";
        this.sections = [
            {
                title: "My Expertise",
                contentList: [
                    {
                        subTitle: "HTML5 & CSS3",
                        subContent: "I specialize in crafting stunning, responsive web designs, ensuring that every website I work on not only looks fantastic but also functions seamlessly on all devices and browsers."
                    },
                    {
                        subTitle: "JavaScript",
                        subContent: "I'm a JavaScript enthusiast, and I leverage the power of this language to create interactive, dynamic, and feature-rich web applications that engage users."
                    },
                    {
                        subTitle: "Angular & React Js",
                        subContent: "I'm well-versed in both Angular and React.js, two popular front-end frameworks. I use them to build scalable, performant, and maintainable applications."
                    },
                    {
                        subTitle: "React Native",
                        subContent: "My proficiency in React Native allows me to extend my skills into the realm of mobile app development, delivering cross-platform solutions that provide a native-like"
                    },
                    {
                        subTitle: "AWS",
                        subContent: "My expertise in Amazon Web Services (AWS) ensures that the applications I build are not only functional but also scalable, secure, and cost-effective."
                    },
                    {
                        subTitle: "Spring Boot & Hibernate",
                        subContent: "My back-end skills include Spring Boot and Hibernate, enabling me to create robust, efficient server-side components for your web applications."
                    }
                ]
            },
            {
                title: "My Approach",
                contentList: [
                    {
                        subContent: "I'm not just a developer; I'm a problem solver. I approach each project with a focus on the user experience, clean code, and performance optimization. My goal is to translate your vision into a digital reality that exceeds your expectations."
                    }
                ]
            },
            {
                title: "Why Choose Me",
                contentList: [
                    {
                        subContent: "I'm committed to staying up-to-date with the latest web development trends and technologies, ensuring that your project benefits from the most current solutions."
                    },
                    {
                        subContent: "My collaborative nature means I'm an excellent team player and communicator, working closely with designers, back-end developers, and stakeholders to achieve project goals."
                    },
                    {
                        subContent: "I'm passionate about delivering projects on time and within budget, always aiming for the highest quality standards."
                    }
                ]
            },
            {
                title: "Get in Touch",
                contentList: [
                    {
                        subContent: "I'm always eager to take on new challenges and help businesses succeed through the power of technology. If you're looking for a front-end developer who can bring your web and mobile applications to life, don't hesitate to reach out. Let's discuss how I can contribute to your next project."
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
        this.renderer.setAttribute(btnA, 'href', `https://drive.google.com/uc?export=download&id=1vDmbSLO9cYtCRvH-GF8f3TRz90Vm_RoQ`)
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