---
title: "Chapter 6: Free particle" 
short_title: "Ch. 6: Free particle"
numbering:
  enumerator: 6.%s
authors:
  - name: 
    affiliations:
---

In this chapter we will investigate the simplest possible scenario one can consider in the context of mechanics — a **free particle** — one with no forces acting upon it whatsoever. We will see that, given everything we have learnt up until this point, that we can **directly** solve for the evolution of a free particle, since we can immeidately find the the energy eigenstates (the quantum states of a particle with a definite energy) in this simple setting. 

We will see that quantum evolution is more intricate than classical evolution, ultimately due to the HUP. In particular, in a classical setting, if a particle has an initial position $x_0$ and an initial momentum $p_0$, then from the equation of motion — Newton's second law — the position of the particle at time $t$ will be
```{math}
x(t) = x_0 + \frac{p_0}{M}t,
```
(and the momentum is constant, $p(t) = p_0$). 


In quantum mechanics, as we already saw, a particle must necessarily have a **superposition of momenta**. This means that it will be travelling with a superposition of speeds, and therefore after some time, it will be in a superposition of having different displacements from its initial position (i.e. of having travelled different distances). As we will see, this generically leads to **spreading out** of the wavefunction, so that at later times, a position measurement will generally have a **larger standard deviaition**. 

## States of definite energy

Our starting point, as will always be the case, is to ask the question *what are the energy eigenstates of a free particle?*, that is, what are the **states of definite energy?** While in general this is a subtle question, when there are no forces acting on the particle, the situation is much simpler. This is because in this case, no forces translates into a vanishing potential energy $V(x) = 0$, and hence the **Hamiltonian** becomes simply
```{math}
\hat{H} = \frac{\hat{P}^2}{2M},
```
i.e. the **total energy** of the particle is just the **kinetic energy**. *When will a particle have a definite kinetic energy?* This is easy to answer: it will have a definite kinetic energy when it has a **definite momentum**. This therefore suggests that for a free particle
> For a free particle, momentum eigenstates are energy eigenstates.

We can directly verify that this is the case, and find the corresponding energy eigenvalue:
```{math}
:label: e-eig-free-particle
\hat{H}\ket{p} &= \frac{\hat{P}^2}{2M}\ket{p}, \\
&= \frac{p^2}{2M}\ket{p},
```
where to arrive at the second line we used the fact that $\hat{P}^2\ket{p} = \hat{P}\left(\hat{P}\ket{p}\right) = p \hat{P}\ket{p} = p^2\ket{p}$, i.e. $\ket{p}$ is an eigenstate of $\hat{P}^2$ with eigenvalue $p^2$. 

What [](#e-eig-free-particle) shows is that $\ket{p}$ is an eigenstate of $\hat{H}$ (i.e. an energy eigenstate) with energy $E = p^2/2M$. This is **exactly as it should be**, since if a particle has a definite momentum $p$, then it has a (definite) kinetic energy $K = p^2/2M$. 

There are **two important points to note** at this stage. First, there are in fact **two** states each with the same energy: the state $\ket{p}$ and $\ket{-p}$ both have energy $E = p^2/2M$. This is intutive, since the kinetic energy doesn't care about **the velocity** but only the **speed** of the particle, and is hence insensitive to the sign of the momentum. This means that **there are two energy eigenstates for every energy eigenvalue**. This is known as **degeneracy** and we will study this further once we move into 3D at the end of this unit. Because of this degeneracy in energy, it will be essential to keep track of the momentum, and hence we will work with momentum eigenstates (and momentum wavefunctions), rather than energy eigenstates. 

Second, since momentum is **continuous** we see that for a free particle, **energy is always continuous**. This is consistent with what we saw in the previous chapter: there we learnt that the energy will be continuous when the particle isn't **bound** to a potential well. Since there is no potential well for a free particle, the particle is most certainly not bound, and hence we have a continuous range of energies, as expected. 

## Time evolution of a free particle I

Given the above, it is now straightforward to write down the time evolution of a free particle in quantum mechanics. As in the [previous chapter](05-time-evolution.md), we will begin by expressing the initial state $\ket{\psi_\init}$ in terms of the energy eigenstates for a free particle, i.e. given the discussion above, of momentum eigenstates. We can realise that **this is exactly as we did previously in [](02-momentum.md)**, in terms of the momentum wavefunction. In particular, what we called $\phi_\init(E)$ in the previous chapter, we will call here $\tilde{\psi}_\init(p)$, since [](#e-init-non-bound) becomes
```{math}
:label: e-init-free-particle
\ket{\psi_\init} = \infint \tilde{\psi}_\init(p) \ket{p} dp,
```
where we add the subscript $\init$ to the momentum wavefunction to denote the fact that this is the initially specified momentum wavefunction. We can now use the **superposition principle** (i.e. [](#e-non-bound-evolution)) to **write down** the state $\ket{\psi(t)}$ at time $t$. In particular, since $\ket{p}$ is an energy eigenstate with energy $E = p^2/2M$, it will evolve into $e^{-iEt/\hbar}\ket{p} = e^{-ip^2t/2M\hbar}\ket{p}$, at time $t$, and hence the superposition [](#e-init-free-particle) will evolve into
```{math}
:label: e-free-particle-evolution
\ket{\psi(t)} = \infint \tilde{\psi}_\init(p) e^{-ip^2t/2M\hbar} \ket{p} dp,
```
which is readily seen to satisfy the initial condition $\ket{\psi(0)} = \ket{\psi_\init}$. 

It is insightful to express this in a slightly different way, solely in terms of **momentum wavefunctions**. What [](#e-free-particle-evolution) shows is that if we know that the momentum wavefunction at $t = 0$ is 
```{math}
\tilde{\psi}(p,0) = \tilde{\psi}_\init(p),
```
then it will evolve into the wavefunction $\tilde{\psi}(p,t)$ given by
````{card}
```{math}
:label: e-free-particle-mom-evolution
\vph \tilde{\psi}(p,t) = e^{-ip^2t/2M\hbar}\tilde{\psi}_\init(p).
```
````
This equation restates what we already knew, but makes it much clearer. In particular, it says that for a free particle, if we specify the state in terms of the momentum wavefunction, then the evolution is **remarkably simple**: the wavefunction just acquires a phase $e^{-ip^2t/2M\hbar}$ in time! This is because momentum eigenstates are states of definite energy — and are thus **stationary states**. 

## Time evolution of a free particle II

Equations [](#e-free-particle-evolution) and [](#e-free-particle-mom-evolution) in principle give a **complete solution** to the evolution of a free quantum particle. Hence, in principle, we could end the chapter here (after an example maybe). However, this isn't a particularly useful place to stop. The reason for this is that usually we are interested in the **spatial wavefunction** and **its** evolution in time. What we would really like to be able to do therefore is to specify an initial spatial wavefunction $\psi_\init(x)$, and find the wavefunction $\psi(x,t)$ that it evolves into. We will do this in this section. 

We already have all the ingredients we need, we just need to put them all together. First, if the initial condition is specified by a spatial wavefunction $\psi_\init(x)$, then in order to use [](#e-free-particle-mom-evolution) we need to recall how to express $\tilde{\psi}_\init(p)$ in terms of it. This is through the (inverse) Fourier transform, [](#e-psi-x-to-psi-p). That is,
```{math}
\tilde\psi_\init(p) = \frac{1}{\sqrt{2\pi\hbar}}\infint \psi_\init(x) e^{-ipx/\hbar} dx.
```
Substituting this into [](#e-free-particle-mom-evolution), we have thus half-solved our problem:
```{math}
:label: e-free-particle-mom-evolution-1
\vph \tilde{\psi}(p,t) = e^{-ip^2t/2M\hbar}\frac{1}{\sqrt{2\pi\hbar}}\infint \psi_\init(x) e^{-ipx/\hbar} dx,
```
since this now gives a momentum wavefunction at time $t$ in terms of a spatial initial wavefunction. We can finish off our goal, by performing a **second** Fourier transform (now using [](#e-psi-p-to-psi-x)), transforming the momentum wavefunction $\tilde{\psi}(p,t)$ into a spatial wavefunction $\psi(x,t)$. The one **subtlety** that we need to take care with is that we **already used $x$ as our (dummy) integration variable**, but we now want to use $x$ instead as the position variable in $\psi(x,t)$. We therefore **need to change our integration variable to $x'$ for consistency**. Altogether, after some simple re-arranging and simplifying, we obtain
````{card}
```{math}
:label: e-free-particle-evolution-space
\psi(x,t) = \frac{1}{2\pi\hbar} \infint \infint \psi_\init(x') e^{ip(x-x')/\hbar} e^{-ip^2t/2M\hbar} dx' dp.
```
````
This is a **formidible** looking expression, involving a double integration! From this perspective, quantum evolution looks highly complicated. However, this is **completely equivalent** to [](#e-free-particle-mom-evolution). This highlights an important lesson: just because something appears complicated, doesn't mean it doesn't have a simpler form. Equation [](#e-free-particle-evolution-space) is **useful** as it shows how a spatial wavefunction at time $t$ depends upon the spatial wavefunction at time $t= 0$, however if we **only** had this we wouldn't really understand anything. In contrast, we do know how to understand this equation: it is the combination of the relationship between spatial and momentum wavefunctions, combined with the **simple** evolution of momentum wavefunctions. 

In general it isn't possible to **simplify** or **evaluate** anayltically the right-hand side of [](#e-free-particle-evolution-space). That is, if you want to consider a generic initial wavefunction $\psi_\init(x)$, and ask how it evolves in time, then it isn't possible to write down a closed form expression (one not involving integral(s)) for the wavefunction at time $t$. *Does this mean that [](#e-free-particle-evolution-space) is useless?* The answer is absolutely not. Even though we can't get a closed form expression, it is very easy to numerically integrate the right-hand side, and thus study the evolution numerically. 


```{aside} *Numerical integration*
*It is worth noting a couple of points about the numerical integration.* First, you will need to discretise $x$, and evalute the double integral at a finite set of points $x_i$. The resolution you choose will depend upon the problem, and the amount of time you are willing to spend. Second, a little thought needs to be given to the limits of integration. If the initial wavefunction is localised in space, then the integration over $x'$ can be restricted to this region. Furthermore, we don't need to integrate over all momentum in general, as the particle will also only have momentum in a given range (roughly of the size of $\hbar/(\text{size of region in }x)$ due to the HUP).
```

##  Gaussian wavefunction

There is one special initial wavefunction whose evolution can be solved analytically. This is the **Gaussian wavefunction** which we will now study.

Consider that the wavefunction of a particle is initially given by
```{math}
:label: e-initial-gaussian
\psi_\init(x) = \left(\frac{1}{a\sqrt{2\pi}}\right)^{1/2} e^{-x^2/4a^2}e^{ip_0 x/\hbar},
```
where $a >0$ and $p_0 \geq 0$ are constants. This is closely related to the wavefunction we encountered in [](#e-gaussian-wf), except for the additional **phase factor** $e^{ip_0 x/\hbar}$. As you will show in an [exercise](#ex-shifted), this has the effect of **increasing the average momentum of the particle by $p_0$**. Hence, we are now considering a **moving** particle instead of a stationary one, which initially has a spread $\Delta x = a$. 

Substituting this into [](#e-free-particle-evolution-space), after a lengthy and fiddly calculation, it is possible to solve analytically for $\psi(x,t)$. We find 
```{math}
:label: e-gaussian-time-t
\psi(x,t) =  \left(\frac{1}{\alpha(t)\sqrt{2\pi}}\right)^{1/2} e^{-(x-p_0t/M)^2/4\alpha(t)^2}e^{i\phi(x,t)},
```
where $e^{i\phi(x,t)}$ is a **time-dependent phase factor** (which we won't actually write down, as its form isn't too important), and where
```{math}
\alpha(t) = a\sqrt{1+\frac{\hbar^2 t^2}{4M^2 a^4}}.
```

This wavefunction is remarkably similar in form to [](#e-initial-gaussian), except for a couple of key differences:

1. The gaussian becomes centred at $x - p_0t/M$ at time $t$. That is, the gaussian is moving with **constant velocity** $v = p_0/M$. This is similar to a **classical free particle** which moves with constant velocity!
2.  The **width** of the gaussian changes in time. Recall that standard     deviation of the position of the particle was initially given by $\Delta x = a$. Given the form of the wavefunction [](#e-gaussian-time-t), we can read off that
    ```{math}
    :label: e-gaussian-spread
    \Delta x(t) = \alpha(t) = a\sqrt{1+\frac{\hbar^2 t^2}{4M^2 a^4}}.
    ```
    This **grows in time**, from the initial value $\Delta x(0) = a$. It is important to note that $\alpha(t)$ is **independent of $p_0$**, i.e. independent of how fast the particle is moving. This is thus a **univerisal** feature of the dynamics of the wavefunction. We will return to this below. 

3. Finally, there is a phase factor $e^{i\phi(x,t)}$. This term is complicated, but it accounts for **correlations** which build up, between **where the particle is** and **what momentum it has**. 

It is insightful to plot the wavefunction as it evolves in time. We do this below, both for the wavefunction $\psi(x,t)$ and the associated probability density $\pd(x,t) = |\psi(x,t)|^2$, both as an animation and in stills:
```{figure}  ./Pictures/Gaussian-wavepacket.gif
:label: f-gaussian-animation
:alt: Picture of a gaussian function
:align: center
Time evolution of a gaussian wavefunction, as given in [](#e-gaussian-time-t). The parameter $a>0$ determines the 'width' of the wavefunction. Here we represent the complex number $\psi(x,t)$ at each location $x$ and time $t$ in polar form, in terms of the amplitude $|\psi(x,t)|$ (the height), and phase, represented by the colour (with the colour-wheel legend at the top). The particle has a non-zero average momentum $p_0 > 0$, and moves to the right at constant speed, spreading out as it moves.
```

```{figure}  ./Pictures/gaussian-x-t
:label: f-gaussian-time-evolution
:alt: Picture of a gaussian function
:align: center
Time evolution of probability density $\wp(x,t)$ for a gaussian wavefunction as given in [](#e-gaussian-time-t). 
```

## Spreading of wavefunctions
We will end this chapter by discussing in more detail the spreading of wavefunctions of free particles in time. This is a universal feature (not just a feature of the gaussian example above), and arises due to the HUP, hence is a genuinely quantum phenomenon.

Recall from the HUP, that any initial wavefunction we consider $\psi_\init(x)$, will **necessarily have a superposition of momenta**. In particular, it will have an associated momentum wavefunction $\tilde{\psi}_\init(p)$, which determine which momenta the particle has. Now, if a particle would have had a definite momenta, then it would move with definite velocity. However, it has a superposition of momenta, and hence it will move with a superposition of velocities. 

If we consider a fixed time, we therefore see that the particle will have a superposition of **displacements**. This is precisely what **leads to the spreading of wavefunctions**. We can see two interesting hallmarks of this if we look carefully. First, from the HUP, we know that in order for a particle to have an initial wavefunction which is **more localised in space** (i.e. with a smaller $\Delta x$), then it will necessarily need to have a larger spread of momentum $\Delta p$. From the above discussion, we should therefore expect it to **spread faster** in time. This is precisely what we see analytically for the gaussian in [](#e-gaussian-spread): if we make $a$ smaller, then $\alpha(t)$ increases. 

Second, this also explains why the phase factor $e^{i\phi(x,t)}$ occurs (and has a complicated form!). As we have explained above, the spreading is due to the superposition of momenta. It therefore follows that if the particle is further away (at the 'front' of the wavefunction) at later times, we would expect it to have higher momentum, and if it is closer to the initial localtion (at the 'back' of the wavefunction), we would expect it to have lower momentum. That is, **correlations build up in time between where the particle is and what momentum it has**. This is precisely what is captured by the phase factor, and why we should **always** expect to have some phase factor in time. 

## Exercises

````{exercise}
:label: e-H-P-commute
1. Show that for a free particle, the Hamiltonian and momentum operators commute, $[\hat{H},\hat{P}] = 0$. 
2. Are energy and momentum compatible observables for a free particle? 
3. Can a free particle have a definite energy and a definite momentum at the same time? 
````

````{exercise}
:label: ex-shifted
Consider two particles, the first of which has wavefunction $\psi(x)$, and the second of which has wavefunction $\psi'(x)$, related to $\psi(x)$ via
```{math}
\psi'(x) = \psi(x)e^{ip_0x/\hbar},
```
where $p_0$ is a real constant. 
1. Show that the probability density of the two particles, $\pd(x)$ and $\pd'(x)$ are equal to each other, $\pd(x) = \pd'(x)$. Explain why this shows that the two particles are in the same place. 

The momentum wavefunction of the first particle is
```{math}
\tilde\psi(p) = \frac{1}{\sqrt{2\pi\hbar}} \infint \psi(x) e^{-ipx/\hbar}dx. 
```
2. Show that the momentum wavefunction of the second particle is
```{math}
\tilde{\psi}'(p) = \tilde{\psi}(p-p_0).
```
3. If the first particle has average momentum $\av{p} = \overline{p}$, show that the second particle has average momentum $\av{p} = \overline{p} + p_0$. 
4. If the first particle has standard deviation in momentum $\Delta p = \overline \Delta$, find the standard deviation of the second particle. 
5. Explain why the second particle has momentum $p_0$ more than the first particle. 
````

````{exercise}
:label: ex-gaussian-momentum
Consider the gaussian wavefunction from the main text, 
![](#e-initial-gaussian)
1. Using [](#ex-shifted) or otherwise, find the momentum wavefunction $\tilde{\psi}_\init(p)$ of the particle.  
2. Using part 1, **write down** the momentum wavefunction of the particle at time $t$. 
````

````{exercise}
:label: ex-triangle
Consider a quantum particle with an initial wavefunction given by
```{math}
\psi_\init(x) = \begin{cases} N\left(1+\frac{x}{\ell}\right) &\text{ if } -\ell \leq x \leq 0, \\ N\left(1-\frac{x}{\ell}\right) &\text{ if } 0 \leq x \leq \ell, \\ 0 &\text{ otherwise,} \end{cases}
```
where $N > 0$ is a normalisation constant.
1. Show that in order for the wavefunction to be normalised $$N = \sqrt{\frac{3}{2\ell}}.$$
2. Sketch the wavefunction. 
3. Show that the initial momentum wavefunction of the particle is 
```{math}
\vph\tilde{\psi}_\init(p) = 2\sqrt{\frac{3\ell}{\pi\hbar}}\left(\frac{\sin (p\ell/\hbar)}{p\ell/\hbar}\right)^2.
```
4. Write down the wavefunction $\psi(x,t)$. This should be in the form of an integral over $p$ (you are not expected to evaluate this integral!)
5. (*optional*) Numerically evalute the integral in part 4, to find the wavefunction $\psi(x,t)$ for $t = 1, 2, \ldots, 5$ (assuming $\ell = \hbar = M = 1$).  
````