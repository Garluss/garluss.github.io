import pygame as pg
clock = pg.time.Clock()

wWidth = 300
wHeight = 300
window = pg.display.set_mode([wWidth, wHeight])

FPS = 30
playing = True
while playing:
    for event in pg.event.get():
        if event.type == pg.QUIT:
            playing = False
    window.fill((255,255,255))

    

    pg.display.flip()
    clock.tick(FPS)
pg.quit()