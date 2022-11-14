type options =
{
    loop: boolean;
    duration: number;
}

export default class Typing
{
    element: string;
    options: options;
    elementBefore?: HTMLElement

    constructor(element: string, options: options, elementBefore?: HTMLElement)
    {
        this.element = element
        this.options = options
        this.elementBefore = elementBefore
    }

    type(typingText: string)
    {
        return new Promise((resolve, reject) => 
        {
            if(!document.querySelector(this.element)) return reject('Element missing!')
            let i = 0
            const text = document.createTextNode('')
            const interval = setInterval(() => 
            {
                let element = document.querySelector(this.element)
                if(i <= typingText.length - 1 && element !== null)
                {
                    text.appendData(typingText[i])
                    if(this.elementBefore)
                        element!.insertBefore(text, this.elementBefore)
                    else
                        element!.append(text)
                    i++
                }
                else if(i > typingText.length - 1 || element === null)
                {
                    clearInterval(interval)
                    resolve('Success')
                }
                else
                {
                    let never: never 
                }
            }, this.options.duration)
        })
    }
}