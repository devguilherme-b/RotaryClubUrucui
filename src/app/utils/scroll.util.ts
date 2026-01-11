export async function ScrollTo(id: string): Promise<void>{
    const element = document.getElementById(id);

    if(element){
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }