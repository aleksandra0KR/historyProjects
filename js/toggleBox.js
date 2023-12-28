function toggleBox(element) {
    const boxes = document.querySelectorAll('.box');
    const isExpanded = element.classList.contains('expanded');

    boxes.forEach(function(box) {
        if (box === element) {
            box.classList.toggle('expanded');
        } else {
            if (isExpanded) {
                box.classList.remove('hidden');
            } else {
                box.classList.add('hidden');
            }
        }
    });
}