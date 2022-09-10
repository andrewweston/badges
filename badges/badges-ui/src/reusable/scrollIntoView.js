const scrollIntoView = id => {
    const row = document.getElementById(id);
    if (!row) window.setTimeout(() => scrollIntoView(id), 10);
    else {
        row.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
};

export default id => window.setTimeout(() => scrollIntoView(id), 10);
