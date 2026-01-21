import os
import re

def get_files():
    files = []
    media_dir = 'media'
    
    if os.path.exists(media_dir):
        for f in os.listdir(media_dir):
            if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.webp')):
                files.append({'type': 'image', 'path': f'{media_dir}/{f}', 'name': f})
            elif f.lower().endswith(('.mp4', '.webm', '.mov')):
                files.append({'type': 'video', 'path': f'{media_dir}/{f}', 'name': f})
    
    # Sort by 'number' in filename if possible
    def sort_key(item):
        # Extract number
        match = re.search(r'(\d+)', item['name'])
        if match:
            return int(match.group(1))
        return item['name']
    
    files.sort(key=sort_key)
    return files

def generate_slides(files):
    html = ""
    for item in files:
        html += '        <div class="swiper-slide">\n'
        if item['type'] == 'video':
            html += f'          <video autoplay muted playsinline preload="metadata">\n'
            html += f'            <source src="{item["path"]}" type="video/mp4" />\n'
            html += f'          </video>\n'
        else:
            html += f'          <img src="{item["path"]}" alt="{item["name"]}" />\n'
        html += '        </div>\n'
    return html

def update_index():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("index.html not found.")
        return

    start_tag = '<div class="swiper-wrapper">'
    end_tag = '<div class="swiper-pagination">'
    
    if start_tag not in content or end_tag not in content:
        print("Could not find swiper-wrapper or swiper-pagination in index.html")
        return

    # Split content
    pre_wrapper = content.split(start_tag)[0]
    post_wrapper_full = content.split(start_tag, 1)[1]
    
    if end_tag not in post_wrapper_full:
        print("Pagination not found after wrapper")
        return
        
    _, rest = post_wrapper_full.split(end_tag, 1)
    
    files = get_files()
    slides_html = generate_slides(files)
    
    # Construct new content
    # We assume standard formatting: </div> comes before <div class="swiper-pagination">
    # We will force a clean closing div
    new_content = pre_wrapper + start_tag + '\n' + slides_html + '      </div>\n      ' + end_tag + rest
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated index.html with {len(files)} slides (Images & Videos).")

if __name__ == '__main__':
    update_index()
