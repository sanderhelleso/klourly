export const getWeek = () => {
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    const currentWeek = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
    return currentWeek === 52 ? 1 : currentWeek - 1;
}